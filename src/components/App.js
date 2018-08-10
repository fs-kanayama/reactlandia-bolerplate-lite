import React from 'react'
import { connect, Provider } from 'react-redux'

import Switcher from './Switcher'
import Nav from './Nav'

import initStore from '../state/store'


const createApp = ({ url } = {}) => {
  const { store } = initStore({ url })

  const App = () => (
    <div>
      <Nav/>
      <hr/>
      <Switcher/>
    </div>
  )

  const AppConnected = connect()(App)

  const AppWrapped = () => (
    <Provider store={store}>
      <AppConnected/>
    </Provider>
  )

  return { App: AppWrapped, store }
}

export default createApp
