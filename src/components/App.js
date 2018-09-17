import React from 'react'
import { setConfig, hot } from 'react-hot-loader'

import Switcher from './Switcher'
import Nav from './Nav'

import '../styles/global.css'
import './App.css'

const App = () => (
  <div>
    <Nav/>
    <Switcher/>
  </div>
)

setConfig({ logLevel: 'warn' })

export default hot(module)(App)
