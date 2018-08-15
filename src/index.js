import React from 'react'
import ReactDOM from 'react-dom'
import createApp from './containers/App'

let { App } = createApp()

ReactDOM.hydrate(<App/>, document.getElementById('app'))


