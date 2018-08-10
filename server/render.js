import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import serialize from 'serialize-javascript'
import createApp from '../src/components/App'

export default ({ clientStats }) => (req, res) => {
  const url = req.url || '/'
  const { App, store } = createApp({ url })
  const app = ReactDOM.renderToString(<App/>)

  const chunkNames = flushChunkNames()

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets,
  } = flushChunks(clientStats, { chunkNames })

  const preloadedState = store.getState()
  const preloadedStateString = serialize(preloadedState)

  res.send(
    `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            ${styles}
        </head>
        <body>
            <script>window.__PRELOADED_STATE__ = ${preloadedStateString}</script>
            <div id="app">${app}</div>
            ${cssHash}
            ${js}
        </body>
    </html>
    `)
}
