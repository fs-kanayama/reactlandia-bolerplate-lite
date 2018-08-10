import React from 'react'
import ReactDOM from 'react-dom'
import createApp from './components/App'


let { App } = createApp()

if(process.env.IS_DEVELOPMENT) {
  const { setConfig, hot } = require('react-hot-loader')
  setConfig({ logLevel: 'warn' })
  App = hot(module)(App)
}

ReactDOM.hydrate(<App/>, document.getElementById('app'))


