const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = berun => {
  const ISPRODUCTION = process.env.NODE_ENV == 'production'

  berun.webpack
    .entry('frame')
    .when(!ISPRODUCTION, entry =>
      entry.add(require.resolve('react-dev-utils/webpackHotDevClient'))
    )
    .add(path.join(berun.options.paths.appSrc, 'frame'))
    .end()

  berun.webpack
    .plugin('html')
    .tap(t => {
      return [
        Object.assign({}, t[0], {
          excludeChunks: ['frame']
        })
      ]
    })
    .end()

  berun.webpack.optimization
    .when(ISPRODUCTION, optimization =>
      optimization.splitChunks({ chunks: 'initial', name: 'commons' })
    )
    .runtimeChunk(false)

  const frameHtml= path.join(berun.options.paths.appPublic, 'frame.html')
  const frameHtmlExists = fs.existsSync(frameHtml)

  berun.webpack
    .plugin('htmlframe')
    .use(HtmlWebpackPlugin, [
      clean({
        inject: true,
        filename: 'frame.html',
        chunks: ['frame', 'commons'],
        template: frameHtmlExists ? frameHtml : null,
        templateContent: frameHtmlExists ? null : `<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <title>Frame</title>
    <style>*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif}</style>
  </head>
  <body>
  <div id="root"></div>
  </body>
</html>` 
      })
    ])
    .end()
}

function clean(obj) {
  for (var propName in obj) { 
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
}