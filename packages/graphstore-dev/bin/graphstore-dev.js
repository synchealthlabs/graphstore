#!/usr/bin/env node
const importJsonExportGraphQl = require('@besync/graphstore-dev').importJsonExportGraphQl,
    importGraphQl = require('@besync/graphstore-dev').importGraphQl,
    exportModelTs = require('@besync/graphstore-dev').exportModelTs,
    path = require('path'),
    fs = require('fs'),
    util = require('util');

var cmd = process.argv[2];
var args = process.argv.slice(3);

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

switch (cmd) {
    case 'graphql':
        var inputfile = path.resolve(process.cwd(), args[0]);
        var outputfile = path.resolve(process.cwd(), args[1]);
        createDirectories(outputfile)
        exportModelTs(outputfile, importGraphQl(inputfile));
        break;
    case 'firebase':
        var inputfile = path.resolve(process.cwd(), args[0]);
        var outputfile = path.resolve(process.cwd(), args[1]);
        createDirectories(outputfile)
        importJsonExportGraphQl(inputfile, outputfile);
        break;
    default:
        throw new Error("Unsupported command; only 'Firebase to GraphQL' or 'GraphQL to TS' generation implemented");
}

