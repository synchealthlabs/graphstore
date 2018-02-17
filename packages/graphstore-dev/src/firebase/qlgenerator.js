const NameConverter = require('./name_converter');
const { getTypeFromKey, getReverseRelatedField, getLastWord, rightTrim, getProper, pluralize } = NameConverter;
const util = require('util');

const idkeys = {
    Chat: {
        user: "from_user",
        chat_user: "to_user",
        chat_id: "message_id"
    },
    ClientSpecialist: {
        user: "client_user",
        specialist_user_id: "specialist_user",
    },
    OrgUser: {
        user_user: "user",
        id: "role_id"
    },
    SpecialistClient: {
        user: "specialist_user",
        client_user: "client_user"
    },
    VaultOneToOne: {
        user: "from_user",
        one_user: "to_user",
        id2: "item_id"
    },
    Metric: {
        id2: "period_id"
    }
};

const supressGetAll = [
    "Recipe", "User"
]

const headerTemplate = `
# This GraphQL file was based on extracted data from Firebase
# and used as the basis for generating the Javascript (Mobx) object graph model (OGM)

# CHANGE HISTORY
# ${new Date().toString()} Initial generation from Firebase using firebase-schema-generator

# SCALARS
# Built in:  Int, Float, String, Boolean, ID
scalar Date
scalar Time
scalar Json

# SUBSTITUTIONS
#    __ substituted for : in keys
#    All spaces and non alphanumerics removed in enums

# DIRECTIVES
#    @primary  - mark field as part of the primary key (composite keys allowed)
#    @foreign - mark primary key field as also the foreign key of another Type
#    @json(key1: "type", key2: "type" ...) - field contains a JSON object or array with type
#    @connector(name: function) - provide resolver function linking to another Type
#    @resolver(get: function) - provide resolver function to backend persistent storage / database path
#    @entityprefixed - field is foreign key of one of multiple other entities (e.g org: or user:)
#    @source(key: "value") -  key is stored as value in backend persistent storage
`

const schemaTypeTemplate = (entity) => {
    var name = entity.name;

    var fields = Object.keys(entity.fields).map(function (key) {
        return fieldTemplate(key, entity.fields[key]);
    }).join();

    if (entity.foreignfields) fields = fields + Object.keys(entity.foreignfields).map(function (key) {
        var resolver = entity.foreignfields[key];


        return fieldTemplate(key, (resolver.isCollection ? "[" + entity.foreignfields[key].name + "]" : entity.foreignfields[key].name) + ' @resolver(get: "' + entity.foreignfields[key].connector + "(" + entity.foreignfields[key].args.join(", ") + ")" + '")');
    }).join();

    return `
type ${name} ${nodeResolverTemplate(entity)}${connectorsTemplate(entity)}
    {${fields}
    }
    `
}

const fieldTemplate = (key, value) => {
    if (key.endsWith('*'))
        return `
        ${rightTrim(key)}: ${typeof value == 'object' ? util.inspect(value, false, null) : value} @primary`
    else
        return `
        ${key}: ${typeof value == 'object' ? util.inspect(value, false, null) : value}`
}

const jsonTemplate = (obj, isnested) => {
    if (typeof(obj) !== 'object') return obj;

    return Object.keys(obj).map(function (key) {
        let value = obj[key];
        if (typeof (value) == 'string') 
        {
            if (isnested)
                return `'${key}': "${value}"`;
            else 
                return `${key}: "${value}"`;
        }
        else if (Array.isArray(value) && !isnested)
            return key +": \"[Json!] @json([{" + jsonTemplate(value[0], true).replace(/"/g, "'") + "}])\"";
        else if (typeof value == "object" && !isnested)
             return key + ": \"Json! @json({" + jsonTemplate(value, true).replace(/"/g, "'") + "})\"";
        else
            return `${key}: "${util.inspect(obj[key])}"`; 
    }).join(", ");
}

const schemaEnumTemplate = (entity) => {
    var name = entity.name;

    var values = entity.fields.enum.map(function (value) {
        return enumValueTemplate(value);
    }).join();

    return `
enum ${name} 
    {${values}
    }
    `
}

const enumValueTemplate = (value) => {
    return `
        ${value}`
}

const nodeResolverTemplate = (entity) => {
    var primaryKeys = Object.keys(entity.fields).filter((key) => { return key.endsWith("*") }).map(key => (key.endsWith("id*") ? rightTrim(key) : rightTrim(key) + "_id"));
    return `
     @connector(byId: "(${primaryKeys.join(", ")}) => getDocument('${entity.path}')")`
}

const connectorsTemplate = (entity) => {
    return entity.connectors.map(function (connector) {
        return `
     @connector(${connector.name}: "(${connector.args.join(", ")}) => ${connector.action}('${connector.path}')")`
    }).join("");
}

function addItemToEntity(entity, item) {

    if (Array.isArray(item)) {
        if (item.length == 1) {
            item = item[0]
            if (typeof item == "string" && item.startsWith("Enum"))
                item = { enumRef: item }
        }
        else
            item = { enum: item }
    }
    else if (Object.keys(item).length == 1) {
        var subkey = Object.keys(item)[0];

        if (Array.isArray(item))
            item = item[subkey][0];
        else
            item = item[subkey];

        if (Array.isArray(item) && item.length == 1 && typeof item[0] == "string" && item[0].startsWith("Enum")) {

            entity.fields = {}
            return;
        } else {

            if (entity.name !== "Vault") {
                entity.name = pluralize(entity.name);
                entity.namefn = pluralize(entity.namefn);
                // entity.namefn += "For" + getTypeFromKey(subkey);
            }
            else {
                entity.name += "OneToOne";
                //  entity.namefn += "OneToOne";
            }
            entity.path = entity.path + "/" + subkey;

            return addItemToEntity(entity, item);
        }

    } else if (Object.keys(item).length == 2) {

        // TODO BOTH 1 & 2
        var subkey = Object.keys(item)[0];
        item = item[subkey];
        entity.path += "/" + subkey;
        entity.name += "" + getTypeFromKey(subkey);
        entity.namefn += "" + getTypeFromKey(subkey);

        return addItemToEntity(entity, item);
    }

    if ("id" in item) {
        var idkey, namefnsegment, foreignkey = null;

        if (item.id == "UserId!" && entity.name !== "User") {
            idkey = updateIdKey(entity, "user*");
            entity.namefn += "ForUser";
            entity.path = entity.path + "/${" + rightTrim(idkey) + "_id}";
            foreignkeys.user[getReverseRelatedField(entity.key)] = { name: entity.name, args: ["id"], connector: entity.namefn }
            namefnsegment = "ForUser";
            entity.fields[idkey] = "User! @foreign"
            delete item.id;

        } else if (item.id == "OrgId!" && entity.name !== "Org") {
            idkey = updateIdKey(entity, "org*");
            entity.fields[idkey] = item.id;
            entity.namefn += "ForOrg";
            entity.path = entity.path + "/${" + rightTrim(idkey) + "_id}";
            foreignkeys.org[getReverseRelatedField(entity.key)] = { name: entity.name, args: ["id"], connector: entity.namefn }
            namefnsegment = "ForOrg";
            entity.fields[idkey] = "Org! @foreign"
            delete item.id;

        } else if (typeof item == 'object' && "id" in item) {
            if (Object.keys(entity.fields).length == 0 && supressGetAll.indexOf(entity.name) == -1)
                entity.connectors.push({ name: "All", args: [], action: "getCollection", path: entity.path })
            idkey = updateIdKey(entity, "id*");
            entity.fields[idkey] = item.id;
            entity.path = entity.path + "/${" + rightTrim(idkey) + "}";
            namefnsegment = "ForId"
            entity.fields[idkey] = item.id;
            delete item.id;
        }

        if (entity.subname) idkey = entity.subname.toLowerCase() + "_" + idkey;

        var primaryKeys = Object.keys(entity.fields).filter((key) => { return key.endsWith("*") }).map(key => rightTrim(key)).map(key => (key.endsWith("_id") || key == "id") ? key : key + "_id");
        entity.connectors.push({ name: entity.namefn, args: primaryKeys, action: "getCollection", path: entity.path })
    }

    var keys = Object.keys(item);

    if (keys.length == 1 && keys[0] !== "values" && keys[0] !== "enum" && Array.isArray(item[keys[0]])) {
        var subkey = keys[0];
        item = item[subkey];
        entity.path = entity.path + "/" + subkey;
        entity.name = entity.name;
        entity.subname = (entity.subname || "") + getTypeFromKey(subkey)
        return addItemToEntity(entity, item);
    }

    entity.fields = Object.assign(entity.fields, fixUserOrg(item));

    if (entity.fields.values) {
        promotevalues(entity);
    }
}

function updateIdKey(entity, idkey) {

    if (entity.name in idkeys) {
        return ((idkeys[entity.name][rightTrim(idkey)]) || rightTrim(idkey)) + "*";
    }
    else return idkey;

}

function fixUserOrg(obj, isnested) {
    if (typeof obj !== 'object') return obj;
    if ("enum" in obj) {
        return fixEnum(obj);
    }

    var newObj = {};

    Object.keys(obj).forEach(function (key) {
        var value = obj[key];
        if (key.search(":")) key = key.replace(/:/g, "__");

        newObj[key] = mapOrgUser(key, value, isnested)
    });
    return newObj;
}

function fixEnum(obj) {

    var newNnum = [];

    obj.enum.forEach(function (key) {

        var newKey = (/[^_A-Za-z0-9]/.test(key)) ? key.replace(/:/g, "__").replace(/[^_A-Za-z0-9]/g, "") + ` @source(key: "${key}")` : key
        newNnum.push(newKey);
    });
    return { enum: newNnum };
}

function mapOrgUser(key, value, isnested) {
    if (key == "values")
        return value
    else if (value == "OrgId" || value == "OrgId!")
        return value.endsWith("!") ? "Org!" : "Org"
    else if (value == "UserId" || value == "UserId!")
        return value.endsWith("!") ? "User!" : "User"
    else if (value == "UserOrOrgIdPrefixed!")
        return "String! @entityprefixed"
    else if (value == "UserOrOrgIdPrefixed")
        return "String @entityprefixed"
    else if (Array.isArray(value) && !isnested)
        return "[Json!] @json(" + jsonTemplate(fixUserOrg(value[0], true)) + ")";
    else if (typeof value == "object" && !isnested)
        return "Json! @json(" + jsonTemplate(fixUserOrg(value, true)) + ")";
    else if (typeof value == "object")
        return "Json! @json(" + JSON.stringify(value).replace(/"/g, "'") + ")";
    else
        return value
}

function promotevalues(entity) {

    if (typeof (entity.fields.values[0]) !== "object")
        return;

    var values = entity.fields.values[0];
    delete entity.fields.values;

    Object.keys(values).forEach(function (subkey) {

        if (subkey == "id") {
            var idkey = getLastWord(entity.name).toLowerCase();
            var namefnsegment;

            if (values.id == "UserId!") {
                namefnsegment = "User"
                idkey = idkey + "_user*"
                values.id = "User! @foreign"
            }
            else if (values.id == "OrgId!") {
                idkey = idkey + "_org*"
                namefnsegment = "Org"
                values.id = "Org! @foreign"
            }
            else {
                idkey = "id*";
                if (values.id.startsWith("Enum")) {
                    namefnsegment = values.id.substr(4);
                    if (namefnsegment.endsWith("!")) namefnsegment = rightTrim(namefnsegment);
                }
                else
                    namefnsegment = "Id";
            }

            if ("user_" + getLastWord(entity.name).toLowerCase() + "_user_id*" in entity.fields)
                idkey = "user_" + idkey;

            if (idkey in entity.fields)
                idkey = rightTrim(idkey) + "2*";

            idkey = updateIdKey(entity, idkey);

            entity.fields[idkey] = values.id;
            entity.path = entity.path + "/${" + (idkey.endsWith("id*") ? rightTrim(idkey) : rightTrim(idkey) + "_id") + "}"

            entity.namefn += namefnsegment;
            var primaryKeys = Object.keys(entity.fields).filter((key) => { return key.endsWith("*") }).map(key => rightTrim(key)).map(key => (key.endsWith("_id") || key == "id") ? key : key + "_id");
            entity.connectors.push({ name: entity.namefn, args: primaryKeys, action: "getCollection", path: entity.path })

        }
        else
            if (typeof values[subkey] == "object" && subkey !== "values")
                if (Array.isArray(values[subkey]))
                    entity.fields[subkey] = "[Json!] @json(" + jsonTemplate(values[subkey][0]) + ")";
                else
                    entity.fields[subkey] = "Json! @json(" + jsonTemplate(values[subkey]) + ")";
            else {
                var value = values[subkey];
                if (subkey.search(":")) subkey = subkey.replace(/:/g, "__");
                entity.fields[subkey] = mapOrgUser(subkey, value);
            }
    })

    if (entity.fields.values) {
        promotevalues(entity);
    }

    if (entity.fields.values && typeof entity.fields.values == "object") {
        if (Array.isArray(entity.fields.values)) {
            if (typeof entity.fields.values[0] == "object")
                entity.fields.values = "[Json!] @json(" + jsonTemplate(entity.fields.values[0]) + ")";
            else
                entity.fields.values = "[" + entity.fields.values[0] + "]";
        }
        else
            entity.fields.values = "Json! @json(" + jsonTemplate(entity.fields.values) + ")";
    }

}

var foreignkeys = { user: {}, org: {} }

module.exports = function generate(schema) {

    var entities = {};

    Object.keys(schema).forEach(function (entityKey) {

        var entity = { key: entityKey, name: getTypeFromKey(entityKey), path: entityKey, namefn: getProper(entityKey), fields: {}, connectors: [] }

        var item = schema[entityKey];

        addItemToEntity(entity, item);

        if (!("enum" in entity.fields) && (Object.keys(entity.fields).length > 0)) {
            var lastConnector = entity.connectors[entity.connectors.length - 1];
            lastConnector.action = "getDocument";

            if ((lastConnector.args.length > 1) || (lastConnector.args.length == 1 && lastConnector.args[0] == "id"))
                entity.connectors.pop();
        }

        entities[entity.name.toLowerCase()] = entity;

    })

    Object.keys(foreignkeys.user).forEach(function (key) {
        var resolver = foreignkeys.user[key];
        var referencedConnector = entities[resolver.name.toLowerCase()].connectors.filter(connector => connector.name == resolver.connector)[0]
        resolver.isCollection = (referencedConnector.action == "getCollection");
    })

    Object.keys(foreignkeys.org).forEach(function (key) {
        var resolver = foreignkeys.org[key];
        var referencedConnector = entities[resolver.name.toLowerCase()].connectors.filter(connector => connector.name == resolver.connector)[0]
        resolver.isCollection = (referencedConnector.action == "getCollection");
    })

    entities["user"].foreignfields = foreignkeys.user;
    entities["org"].foreignfields = foreignkeys.org;

    // PASS TWO, TO ADJUST NOW THAT PRIMARY KEYS ARE KNOWN
    Object.keys(entities).forEach(function (entityKey) {

        var entity = entities[entityKey];


    })

    var count = 0;

    var formattedresult = [headerTemplate].concat(Object.keys(entities).map(function (entityKey) {

        var entity = entities[entityKey];

        if ("enum" in entity.fields) {
            count++;
            return schemaEnumTemplate(entity);
        }
        if (Object.keys(entity.fields).length > 0) {
            count++;
            return schemaTypeTemplate(entity);
        }
        else
            return null;

    })).join("");

    console.log(count + " entitites generated");

    return formattedresult;

}

