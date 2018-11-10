module.exports = berun => {
  berun.webpack.bail(true)

  berun.babel
    .plugin('@babel/plugin-proposal-decorators')
    .options({ legacy: true })
    .end()
}
