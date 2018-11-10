module.exports = {
  use: [
    '@berun/preset-react',
    '@berun/runner-tslint',
    '@berun/runner-prettier',
    '@berun/runner-tsmain',
    require('@besync/react-use-iframe/berun'),
    require('@besync/react-use-graphstore-channel/berun')
  ]
}
