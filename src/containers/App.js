import React from 'react'
import { connect, Provider } from 'react-redux'
import App from '../components/App'

import initStore from '../state/store'

const createApp = ({ url } = {}) => {
  const { store } = initStore({ url })

  const AppConnected = connect()(App)

  const AppWrapped = () => (
    <Provider store={store}>
      <AppConnected/>
    </Provider>
  )

  return { App: AppWrapped, store }
}

export default createApp
