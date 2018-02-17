var fs = require('fs');
var gql = require('graphql-tag');
var util = require('util');

module.exports.default = function(filename) {

    var s = fs.readFileSync(filename, 'UTF8');

    var schema = gql(s);
    
    var entities = {};
    
    Object.keys(schema.definitions).forEach(function (key) {
    
        if (schema.definitions[key].kind == "ObjectTypeDefinition") {
            var def = schema.definitions[key];
            var entity = { name: def.name.value, connectors: {}, fields: [] }
            if (def.description) entity.description = def.description;
    
            def.directives.forEach(function (directive) {
                if (directive.name.value !== "connector") throw new Error("Unknown directive " + directive.name.value);
    
                var parseValue = directive.arguments[0].value.value;
                var parse = parseValue.match(/^\(([\w,\s]*)\)\s*=>\s*(get\w*)\('(.*)'\)$/);
                entity.connectors[directive.arguments[0].name.value] = { args: parse[1].split(','), action: parse[2], path: parse[3]};
    
            })
    
            def.fields.forEach(function (def) {
                var field = { name: def.name.value.replace(/__/g, ":") };
                if (def.type && def.type.kind == "NonNullType") field.nonNull = true;
                if (def.type && def.type.kind == "NamedType") field.type = def.type.name.value;
                if (def.type && def.type.kind == "NonNullType" && def.type.type && def.type.type.kind == "NamedType") field.type = def.type.type.name.value;
    
                if (def.type && def.type.kind == "ListType") field.listType = true;
                if (def.type && def.type.kind == "ListType" && def.type.type && def.type.type.kind == "NamedType") field.type = def.type.type.name.value;
                if (def.type && def.type.kind == "ListType" && def.type.type && def.type.type.kind == "NonNullType") field.nonNull = true;
                if (def.type && def.type.kind == "ListType" && def.type.type && def.type.type.kind == "NonNullType" && def.type.type.type && def.type.type.type.kind == "NamedType") field.type = def.type.type.type.name.value;
    
                if (def.directives.findIndex(f => f.name.value == "primary") > -1) field.primary = true;
                if (def.directives.findIndex(f => f.name.value == "foreign") > -1) field.foreign = true; 
    
                if (def.directives.findIndex(f => f.name.value == "entityprefixed") > -1) field.entityprefixed = true;
                if (def.directives.findIndex(f => f.name.value == "json") > -1) {
                    field.json = [];
                    def.directives.find(f => f.name.value == "json").arguments.map(function (d) {
                        if (d.value.value.startsWith("Json")) {
                            var json = d.value.value.substr(1 + d.value.value.search(/\(/));
                            json = json.substr(json, json.length - 1).replace(/'/g, '"');
    
                            var jsonFields = JSON.parse(json);
    
                            if (Array.isArray(jsonFields))
                                field.json.push({ name: d.name.value.replace(/__/g, ":"), listType: true, type: jsonFields[0], nonNull: true })
                            else {
                                var jsonObject = Object.keys(jsonFields).map((jsonKey) => {
                                    var type = jsonFields[jsonKey];
                                    if (type.endsWith("!")) return { name: jsonKey, type: type.substr(0, type.length - 1), nonNull: true }
                                    else return { name: jsonKey, type: type }
                                })
    
                                field.json.push({ name: d.name.value.replace(/__/g, ":"), type: "Json", nonNull: true, json: jsonObject })
                            }
                        }
                        else if (d.value.value.startsWith("[Json")) {
                            var json = d.value.value.substr(1 + d.value.value.search(/\(/));
                            json = json.substr(json, json.length - 1).replace(/'/g, '"');
    
                            var jsonFields = JSON.parse(json);

                            if (Array.isArray(jsonFields))
                                jsonFields = jsonFields[0];
    
                            if (Array.isArray(jsonFields))
                                field.json.push({ name: d.name.value.replace(/__/g, ":"), listType: true, type: jsonFields[0], nonNull: true })
                            else {
                                var jsonObject = Object.keys(jsonFields).map((jsonKey) => {
                                    var type = jsonFields[jsonKey];
                                    if (type.endsWith("!")) return { name: jsonKey, type: type.substr(0, type.length - 1), nonNull: true }
                                    else return { name: jsonKey, type: type }
                                })
    
                                field.json.push({ name: d.name.value.replace(/__/g, ":"), type: "Json", nonNull: true, json: jsonObject })
                            }
                        } else {
                            var type = d.value.value;
                            var jsonItem;
                            if (type.endsWith("!")) jsonItem = { name: d.name.value.replace(/__/g, ":"), type: type.substr(0, type.length - 1), nonNull: true }
                            else jsonItem = { name: d.name.value.replace(/__/g, ":"), type: type };
    
                            field.json.push(jsonItem)
                        }
    
                    });
                }
                if (def.directives.findIndex(f => f.name.value == "resolver") > -1) {
                    field.resolver = {};
                    def.directives.find(f => f.name.value == "resolver").arguments.map(function (d) {
                        var parseResolve = d.value.value.split(/[\(\)]/);
                        field.resolver[d.name.value] = { connector: parseResolve[0], args: parseResolve[1].split(", ") }
                    });
                }
    
                entity.fields.push(field);
            })
    
            entities[entity.name] = entity;
        }
    
        if (schema.definitions[key].kind == "EnumTypeDefinition") {
            var def = schema.definitions[key];
            var entity = { name: def.name.value, isEnum: true, connectors: {}, fields: [] }
            if (def.description) entity.description = def.description;
    
            def.directives.forEach(function (directive) {
                entity.connectors[directive.arguments[0].name.value] = directive.arguments[0].value.value;
            })
    
            def.values.forEach(function (def) {
                var field = { name: def.name.value };
    
                if (def.directives.findIndex(f => f.name.value == "source") > -1) {
                    def.directives.find(f => f.name.value == "source").arguments.map(function (d) {
                        field.source = d.value.value
                    });
                }
    
                entity.fields.push(field);
            })
    
            entities[entity.name] = entity;
        }
    
    });

    return entities;
    
}


