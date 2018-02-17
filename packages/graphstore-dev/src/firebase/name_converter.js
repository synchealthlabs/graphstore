
const inflection = require('inflection');
const { camelize, pluralize, singularize } = inflection;

/**
 * 
 * @param {String} fieldName 'users'
 * @return {String} 'Users'
 */
module.exports.getRelationshipFromKey = key => camelize(key);

module.exports.pluralize = key => pluralize(key);

/**
 * 
 * @param {String} fieldName 'users'
 * @return {String} 'User'
 */
module.exports.getTypeFromKey = key => camelize(singularize(key));

/**
 * 
 * @param {String} fieldName 'user_id'
 * @return {String} 'users'
 */
module.exports.getRelatedKey = fieldName =>
    pluralize(fieldName.substr(0, fieldName.length - 3));

/**
 * 
 * @param {String} key 'users'
 * @return {String} 'user_id'
 */
module.exports.getReverseRelatedField = key => camelize(pluralize(key), true);

/**
 * 
 * @param {String} key 'users'
 * @return {String} 'Users'
 */
module.exports.getProper = key => camelize(key);

/**
 * 
 * @param {String} fieldName 'user_id'
 * @return {String} 'User'
 */
module.exports.getRelatedType = fieldName =>
    getTypeFromKey(fieldName.substr(0, fieldName.length - 3));

/**
 * 
 * @param {String} fieldName 'LastWord'
 * @return {String} 'Word'
 */
    module.exports.getLastWord = fieldName =>
    {
        var chunks = fieldName.split(/(?=[A-Z][a-z]+$)/);
        return chunks[chunks.length - 1 ];
    }

    /**
 * 
 * @param {String} fieldName 'word_id*'
 * @return {String} 'word_id'
 */
module.exports.rightTrim = fieldName =>
    fieldName.substr(0, fieldName.length - 1);

    