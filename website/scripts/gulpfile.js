var gulp = require("gulp"),
    typedoc = require("gulp-typedoc"),
    path = require('path'),
    fs = require('fs'),
    rimraf = require('rimraf');

gulp.task("clean", function (done) {
    rimraf('docs/api*.md', ()=> {rimraf('docs/api', done)});
});

gulp.task("docgen", ['clean'], function () {
    return gulp
        .src(["packages/graphstore/src/**/*.ts",'!packages/graphstore/src/index.ts'])
        .pipe(typedoc({
            "module": "commonjs",
            "target": "es2015",
            "emitDecoratorMetadata": false,
            "experimentalDecorators": true,
            "importHelpers": true,
            "noEmitHelpers": true,
            "strict": false,
            "noUnusedLocals": false,
            "noUnusedParameters": false,
            "noImplicitReturns": true,
            includeDeclarations: false,
            "noFallthroughCasesInSwitch": true,
            excludeExternals: true,
            excludePrivate: true,
            excludeProtected: true,
            theme: "markdown",
            out: "docs/api/",
            name: "API",
            ignoreCompilerErrors: true,
            "sourcefile-url-prefix": "http://github.com/@besync/graphstore/packages/graphstore/src/"
        }))
});

gulp.task("copy", ["docgen"], function () {
    return gulp
        .src(["docs/api/*.md"])
        .pipe(gulp.dest("docs"));
});

gulp.task('inventory', ['copy'], function () {
    return gulp
        .src(["docs/api/*.md"])
        .pipe(require('gulp-filelist')('api.json', { flatten: true, removeExtensions: true }))
        .pipe(gulp.dest("docs/api"));
});

gulp.task('default', ['inventory'], function (done) {
    let root = process.cwd();
    var apiList = JSON.parse(fs.readFileSync(path.resolve(root, 'docs/api/api.json')));
    var sidebars = JSON.parse(fs.readFileSync(path.resolve(root, 'website/sidebars.json')));
    sidebars["docs-api"] = {};
    sidebars["docs-api"]["General"] = [];
    sidebars["docs-api"]["Classes"] = [];
    sidebars["docs-api"]["Interfaces"] = [];
    sidebars["docs-api"]["Modules"] = [];
    sidebars["docs-api"]["Enums"] = [];
  
    apiList.forEach((key) => {
        var category = key.split('-')[1];
        switch (category) {
            case 'classes':
                sidebars["docs-api"]["Classes"].push(key);
                break;
            case 'modules':
                sidebars["docs-api"]["Modules"].push(key);
                break;
            case 'interfaces':
                sidebars["docs-api"]["Interfaces"].push(key);
                break;
            case 'enums':
                sidebars["docs-api"]["Enums"].push(key);
                break;
            default:
                sidebars["docs-api"]["General"].push(key);
                break;
        }
    });
    fs.writeFileSync(path.resolve(root, 'website/sidebars.json'), JSON.stringify(sidebars, null, 2));
    rimraf('docs/api', done);
});

gulp.start.apply(gulp, ['default']);