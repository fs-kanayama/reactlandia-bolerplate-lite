const express = require('express')
const webpack = require('webpack')

const clientConfig = require('../webpack/client')

const DEV = process.env.NODE_ENV === 'development'
const app = express()

app.use((req, res, next) => {
  console.info(req.url)
  return next()
})

let isBuilt = false

const done = () =>
  !isBuilt &&
  app.listen(3000, () => {
    isBuilt = true
    console.info('BUILD COMPLETE -- Listening @ http://localhost:3000')
  })

if(DEV) {
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware')

  const serverConfigDev = require('../webpack/server.dev')

  const compiler = webpack([clientConfig, serverConfigDev])
  const clientCompiler = compiler.compilers[0]

  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: clientConfig.output.publicPath,
    writeToDisk: true,
    stats: {
      all: false,
      errors: true,
      warnings: true,
      moduleTrace: true,
      colors: true,
    },
    serverSideRender: true,
    logLevel: 'warn',
  })

  app.use(devMiddleware)
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(compiler))

  devMiddleware.waitUntilValid(done)
}
else {
  const serverConfigProd = require('../webpack/server.prod')

  webpack([clientConfig, serverConfigProd]).run((err, stats) => {

    const { publicPath } = clientConfig.output
    const outputPath = clientConfig.output.path

    const clientStats = stats.toJson().children[0]

    const mainjs = `${serverConfigProd.output.path}/${serverConfigProd.output.filename}`
    const serverRender = require(mainjs).default

    app.use(publicPath, express.static(outputPath))
    app.use(serverRender({ clientStats }))

    done()
  })
}
