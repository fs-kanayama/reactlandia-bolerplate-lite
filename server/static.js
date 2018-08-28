const fs = require('fs-extra')
const path = require('path')

const _ = require('lodash')
const express = require('express')
const webpack = require('webpack')

const clientConfig = require('../webpack/client')
const serverConfig = require('../webpack/server')


webpack([clientConfig, serverConfig]).run((err, stats) => {
  const clientStats = stats.toJson().children[0]

  const mainjs = `${serverConfig.output.path}/${serverConfig.output.filename}`
  const renderStatic = require(mainjs).renderStatic
  const staticMap = require(mainjs).staticMap

  const htmlDir = path.join(__dirname, '..', 'exported-static-website')

  _.map(staticMap, (page, url) => {

    const htmlFilename = path.join(htmlDir, page + '.html')
    fs.ensureDir(path.dirname(htmlFilename))

    console.info(`Rendering url "${url}" into "${path.relative(path.join(__dirname, '..'), htmlFilename)}"`)

    const html = renderStatic({ clientStats, url })
    fs.writeFileSync(htmlFilename, html)
  })

  const staticDir = path.join(htmlDir, clientConfig.output.publicPath)
  fs.copySync(clientConfig.output.path, staticDir)
})
