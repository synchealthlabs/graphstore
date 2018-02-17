const importJsonExportGraphQl = require('@besync/graphstore-dev').importJsonExportGraphQl,
    importGraphQl = require('@besync/graphstore-dev').importGraphQl,
    exportModelTs = require('@besync/graphstore-dev').exportModelTs,
    path = require('path'),
    fs = require('fs'),
    util = require('util');

function createDirectories(outputfile){

    var rootDir = path.resolve(process.cwd());
    var targetDir = path.relative(rootDir, path.dirname(outputfile));

    // CREATE OUTPUT DIRECTORIES IF THEY DONT EXIST
    [targetDir].forEach(targetDir => targetDir.split(path.sep).reduce((parentDir, childDir) => {
        const curDir = path.resolve(parentDir, childDir);
        if (!fs.existsSync(curDir)) {
            fs.mkdirSync(curDir);
        }

        return curDir;
    }, rootDir));
}

var inputfile = path.resolve(__dirname, "../__tests__/secret/db-export.json");
var graphQLFile = path.resolve(__dirname, "../build/schema.graphql");
var modelTSFile = path.resolve(__dirname, "../build/model.ts");
createDirectories(graphQLFile);
createDirectories(modelTSFile);
 importJsonExportGraphQl(inputfile, graphQLFile);
 // exportModelTs(modelTSFile, importGraphQl(graphQLFile));