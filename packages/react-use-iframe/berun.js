const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (berun) => {

  berun.webpack.entry('frame')
    .add(path.join(berun.options.paths.appSrc, 'frame'))
    .end()

  berun.webpack.plugin('html')
    .tap(t => {
      return [Object.assign({}, t[0], {
        excludeChunks: ['frame'],
      })]
    })
    .end()

  berun.webpack.optimization
    .splitChunks({ chunks: 'initial', name: 'commons' })
    .runtimeChunk(false)

  berun.webpack.plugin('htmlframe')
    .use(HtmlWebpackPlugin, [{
      inject: true,
      filename: 'frame.html',
      chunks: ['frame', 'commons'],
      templateContent: `<!DOCTYPE html>
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
    }])
    .end()
}
