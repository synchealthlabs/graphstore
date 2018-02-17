const { getTypeFromKey, getReverseRelatedField, getLastWord, rightTrim } = require('./name_converter');

var fs = require('fs'),
    util = require('util'),
    JSONStream = require('JSONStream');

var generator = require('./qlgenerator');

var enumFromKey = { "Nervousness": "EnumSurveysIntakeQuestionsChoices" };
var ids = { 'harrisons-clients': 'orgs', 'smith-corp': 'orgs',  'dunder-mifflin': 'orgs' };

const enumDefaultKeys = {
    "EnumPeriod": ["allTime", "day", "week", "month", "quarter", "year"],
    values: {}
}

module.exports.default = function (inputfile, outputfile) {

    var getStream = function () {
        var stream = fs.createReadStream(inputfile, { encoding: 'utf8' }),
            parser = JSONStream.parse([true, { emitPath: true }]);
        return stream.pipe(parser);
    };

    var result = {};
    var enums = {};
    var enumFromHash = {};


    Object.keys(enumDefaultKeys).forEach(function (key) {
        if (key !== "values") {
            enumDefaultKeys[key].forEach(function (value) { enumDefaultKeys.values[value] = key; })
            enums[key] = enumDefaultKeys[key];
        }
    });

    // REMOVE _temp and clean encrypted data
    function cleanItem(value) {

        var newvalue = null;

        if (Array.isArray(value)) {

            if (value.indexOf("consumer") > -1) {
                value.forEach(function (key2) {
                    ids[key2] = "roles";
                });
            }

            newvalue = [];

            value.forEach(function (item) {
                newvalue.push(cleanItem(item));
            })

            return newvalue;
        }

        if ((typeof value !== "object") || (value == null)) {
            return value;
        }

        Object.keys(value).forEach(function (key) {

            if (key == "orgs") {
                Object.keys(value[key]).forEach(function (key2) {
                    ids[key2] = "orgs";
                });
            }

            if (key == "_temp") {
                return;
            } else if (key == "encData" || key == "signature" || key == "encPrivateKey" || key == "publicKey") {
                newvalue = newvalue || {};
                if (typeof newvalue !== "object") throw new Error("Not Object" + key)
                newvalue[key] = "..."
            } else {
                newvalue = newvalue || {};
                if (typeof newvalue !== "object") throw new Error("Not Object" + key)
                newvalue[key] = cleanItem(value[key])
            }
        });

        return newvalue;
    }

    function cacheid(key, parent) {

        if (key.substr(0, 1) == '-') return;

        if (parent.indexOf('.') > -1) return;

        if (['orgs'].indexOf(parent) == -1) return

        if (['roles'].indexOf(parent) == -1) return

        ids[key] = parent;
    }

    // Add Ids
    function cleanItem2(value, parent) {
     
        if (Array.isArray(value)) {
            newvalue = [];

            value.forEach(function (item) {
                newvalue.push(cleanItem2(item, parent + ".values"));
            })

            return newvalue;
        }

        if ((typeof value !== "object") || (value == null)) {
            return value;
        }

        var newvalue = null;

        var isParentKey = (["surveys", "videos"].indexOf(parent) > -1)
        var parentComponents = parent.split(".");

        var isParentKey = isParentKey || (parentComponents.length == 2 && (["randomSelections"].indexOf(parentComponents[0]) > -1))

        Object.keys(value).forEach(function (key) {

            if (isKey(key) || value[key]["id"] == key || isParentKey) {

                if (newvalue == null)
                    newvalue = [];
                else if (!Array.isArray(newvalue)) {

                    if (Object.keys(newvalue).length !== 1)
                        throw new Error("Not an array" + JSON.stringify(newvalue));

                    var prevkey = Object.keys(newvalue)[0];
                    var prevobj = newvalue[prevkey];
                    newvalue = [Object.assign({ id: prevkey }, prevobj)];
                    cacheid(prevkey, parent)
                }

                var obj = cleanItem2(value[key], parent + "." + key);

                if (Array.isArray(obj)) {
                    obj = { id: key, values: obj }
                    cacheid(key, parent)
                    newvalue.push(obj);
                } else if (typeof obj !== "object") {
                    obj = { id: key, value: obj };
                    cacheid(key, parent)
                    newvalue.push(obj);
                } else if (obj) {
                    newvalue.push(Object.assign({ id: key }, obj));
                    cacheid(key, parent)
                }

            } else {
                newvalue = newvalue || {};
                newvalue[key] = cleanItem2(value[key], parent + "." + key);
            }
        });

        return newvalue;
    }


    // REMOVE DUPLICATE ENTITIES INSTANCE STRUCTURES
    function cleanItem3(value, parent) {

        var newvalue = null;

        if (Array.isArray(value)) {
            newvalue = [];

            var isAllNumbers = (value.length > 0);
            var isAllStrings = (value.length > 0)
            value.forEach(function (item) {
                if (typeof item !== 'number')
                    isAllNumbers = false;

                if (typeof item !== 'string')
                    isAllStrings = false;
            })

            if (isAllNumbers)
                return [cleanItem3(value[0], parent)];

            if (isAllStrings) {
                var enumKey = "Enum" + getTypeFromKey(parent);
                var hash = value.join("!");
                if (hash in enumFromHash)
                    enumKey = enumFromHash[hash]
                else {
                    var found = true;
                    value.forEach(function (key) {
                        if (!(key in enumFromKey)) found = false;
                    })

                    if (found) {
                        enumKey = enumFromKey[value[0]];
                    } else {
                        enums[enumKey] = value;
                        enumFromHash[hash] = enumKey;

                        value.forEach(function (key) {
                            enumFromKey[key] = "Enum" + getTypeFromKey(parent);
                        })
                    }
                }
                return [enumKey];
            }

            value.forEach(function (item) {
                newvalue.push(cleanItem3(item, parent));
            })

            return newvalue;
        }

        if ((typeof value !== "object") || (value == null)) {
            switch (typeof value) {
                case 'string':
                    if (isId(value)) return 'ID';
                    if (isUser(value)) return 'UserId';
                    if (isUserOrgPrefix(value)) return 'UserOrOrgIdPrefixed';
                    if (ids[value] == "orgs") return 'OrgId';
                    if (ids[value] == "roles") return 'EnumConfigRole';
                    if (value in enumDefaultKeys.values) return enumDefaultKeys.values[value];
                    if (ids[value]) return ids[value] + "Id";
                    return 'String';
                case 'number':
                    if (value > 1300000000 && value < 1700000000)
                        return value % 1 == 0 ? 'Date' : 'Time'
                    return value % 1 == 0 ? 'Int' : 'Float'
                case 'boolean':
                    return 'Boolean';
                default:
                    return value == null ? 'NULL' : value;
            }
        }

        var newvalue = {};

        Object.keys(value).forEach(function (key) {
            newvalue[key] = cleanItem3(value[key], parent + key.substr(0, 1).toUpperCase() + key.substr(1));
        });

        return newvalue;
    }

    // Convert Types
    function cleanItem4(value) {

        var prevItemKeys = {};
        var alwaysPresent = {};
        var allKeys = {};

        if (Array.isArray(value)) {
            value.forEach(function (item) {

                if (item !== null && typeof item === 'object') {
                    Object.keys(item).forEach(function (key) {
                        alwaysPresent[key] = true;
                        allKeys[key] = cleanItem4(item[key]);
                    });
                }
            });
            value.forEach(function (item) {
                if (item !== null && typeof item === 'object') {
                    Object.keys(alwaysPresent).forEach(function (key) {
                        if (!(key in item)) {
                            alwaysPresent[key] = false;
                        }
                    });
                }
            });
            Object.keys(alwaysPresent).forEach(function (key) {
                if (alwaysPresent[key] && (typeof allKeys[key] == 'string')) {
                    allKeys[key] = allKeys[key] + "!";
                }
            });

            if (Object.keys(allKeys).length > 0) {
                return [allKeys];
            } else {
                return value;
            }

        }

        if ((typeof value !== "object") || (value == null)) {
            return value;
        }

        var newValue = {};

        Object.keys(value).forEach(function (key) {
            newValue[key] = cleanItem4(value[key]);
        });
        return newValue;
    }

    function cleanItem5(item, parent, title) {

        if ((typeof item !== "object") || (item == null)) {
            return item;
        }

        if (parent !== "values") {
            var newValue;
            if (Array.isArray(item)) {
                newValue = [];
                item.forEach(function (subItem) {
                    newValue.push(cleanItem5(subItem, parent, title));
                })
            } else {
                newValue = {}
                Object.keys(item).forEach(function (key) {
                    newValue[key] = cleanItem5(item[key], key, title);
                })
            }
            return newValue;
        } else {
            item = item[0];
            var enumName = "Enum" + getTypeFromKey(title) + "Type";
            var newValueGrandChild = {};
            var newValueChild = { id: enumName + "!", values: [newValueGrandChild] };
            var newValue = { id: null, values: [newValueChild] };
            var newEnum = [];
            Object.keys(item).forEach(function (key) {
                if (key == "id") {
                    newValue[key] = item[key]
                } else {
                    newEnum.push(key);
                    Object.assign(newValueGrandChild, item[key][0])
                }
            })
            enums[enumName] = newEnum;
            return [newValue];

        }
    }

    function addItem(key, subkey, value) {
        result[key] = result[key] || {}; ""
        if (subkey != "_temp")
            result[key][subkey] = cleanItem(value);
    }

    var secondresult = {};
    var thirdresult = {};
    var fourthresult = {};
    var fifthresult = {};

    function secondPass(key, value) {
        secondresult[key] = cleanItem2(value, key);
    }

    function thirdPass(key, value) {
        thirdresult[key] = cleanItem3(value, key.substr(0, 1).toUpperCase() + key.substr(1));
    }

    function fourthPass(key, value) {
        fourthresult[key] = cleanItem4(value);
    }

    function fifthPass(key, value) {
        if (key !== "vaults")
            fifthresult[key] = fourthresult[key];
        else
            fifthresult[key] = cleanItem5(value, key, key);
    }

    function isKey(x) {
        if (x.substr(0, 1) == '-') return true;
        if (/^[a-zA-Z0-9_-]+:\w+-\w+-\w+-\w+-\w+$/.test(x)) return true;
        if ((/[a-z]+.*[A-Z]+.*[0-9]+.*/.test(x)) && x.length == 20) return true;
        if (/^google-\w+:\d+$/.test(x)) return true;
        if (/^\w{8}-\w{4}-\w{4}-\w{4}-\w+$/.test(x)) return true;
        if (/^urn:device:screensessiontracker$/.test(x)) return true;
        if (/^facebook:\d+$/.test(x)) return true;
        if (/^sms:\w+$/.test(x)) return true;
        if (/^waad:[a-zA-Z0-9_-]+$/.test(x)) return true;
        if (/^\d+$/.test(x)) return true;
        if (/^\d+-201\d$/.test(x)) return true;
        if (/^Q\d+-201\d$/.test(x)) return true;
        if (/^\d+-\d+-201\d$/.test(x)) return true;
        if (x in enumDefaultKeys.values) return true;
        if (ids[x] == "orgs") return true;
        if (ids[x] == "roles") return true;
        return false;
    }

    function isUser(x) {
        if (/^[a-zA-Z0-9_-]+:\w+-\w+-\w+-\w+-\w+$/.test(x)) return true;
        if (/^google-\w+:\d+$/.test(x)) return true;
        if (/^facebook:\d+$/.test(x)) return true;
        if (/^sms:\d+$/.test(x)) return true;
        if (/^waad:[a-zA-Z0-9_-]+$/.test(x)) return true;
        return false;
    }
    function isId(x) {
        if (x.substr(0, 1) == '-') return true;
        if ((/[a-z]+.*[A-Z]+.*[0-9]+.*/.test(x)) && x.length == 20) return true;
    //    if ((/[a-zA-Z_]+[0-9]+\w*/.test(x))) return true;
        if (/^\w+-\w+-\w+-\w+-\w+$/.test(x)) return true;
        if (/^urn:device:screensessiontracker$/.test(x)) return true;
        return false;
    }
    function isUserOrgPrefix(x) {
        if (/^user:/.test(x)) return true;
        if (/^org:/.test(x)) return true;
        return false;
    }

    // var schema = generator(require('./db-export.schema.json'));
    // fs.writeFileSync("./db-export.graphql", schema);
    // process.exit();

    getStream().on('data', function (data) {
        addItem(data.path[0], data.path[1], data.value);
    })

    getStream().on('end', function () {

        Object.keys(result).forEach(function (key) {
            secondPass(key, result[key]);
        })

        Object.keys(secondresult).forEach(function (key) {
            thirdPass(key, secondresult[key]);
        })

        Object.keys(thirdresult).forEach(function (key) {
            fourthPass(key, thirdresult[key]);
        })

        Object.keys(fourthresult).forEach(function (key) {
            fifthPass(key, fourthresult[key]);
        })

        fifthresult = Object.assign(fifthresult, enums);


          fs.writeFileSync("./build/db-export.schema1", util.inspect(result, { showHidden: false, depth: null }));
          fs.writeFileSync("./build/db-export.schema2", util.inspect(secondresult, { showHidden: false, depth: null }));
          fs.writeFileSync("./build/db-export.schema3", util.inspect(thirdresult, { showHidden: false, depth: null }));
          fs.writeFileSync("./build/db-export.schema4", util.inspect(fourthresult, { showHidden: false, depth: null }));
          fs.writeFileSync("./build/db-export.schema.json", JSON.stringify(fifthresult, null, 2));

        var schema = generator(fifthresult);

        fs.writeFileSync(outputfile, schema);

        process.exit();
    })

}