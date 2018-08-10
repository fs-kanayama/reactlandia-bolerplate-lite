import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectRoutes } from 'redux-first-router'
import restoreScroll from 'redux-first-router-restore-scroll'
import { createBrowserHistory, createMemoryHistory } from 'history'

import { routesMap } from '../routes'

import { initialStatePage, reducerPage } from './reducer_page'


const initStore = ({ url } = {}) => {

  const history = process.env.IS_SERVER
    ? createMemoryHistory({ initialEntries: url ? [url] : null })
    : createBrowserHistory()

  // Setup redux-first-router
  const {
    reducer: reducerRouter,
    middleware: middlewareRouter,
    enhancer: enhancerRouter,
  } = connectRoutes(history, routesMap, { restoreScroll: restoreScroll() })

  // Setup reducers
  const rootReducer = combineReducers({
    location: reducerRouter,
    page: reducerPage,
  })

  // Setup middleware/enhancer
  let middleware = [
    thunk,
    middlewareRouter,
  ]

  if(process.env.IS_DEVELOPMENT) {
    middleware.push(require('redux-immutable-state-invariant').default())
  }

  const enhancer = compose(
    enhancerRouter,
    composeWithDevTools(applyMiddleware(...middleware)),
  )

  // Setup state
  let initialState = {}
  if(process.env.IS_SERVER) {
    // On server use initial state directly
    initialState = {
      page: initialStatePage,
    }
  }
  else { // not process.env.IS_SERVER
    // On client use server-rendered state to avoid rendering again
    initialState = window.__PRELOADED_STATE__
    delete window.__PRELOADED_STATE__
  }

  // Create store
  const store = createStore(rootReducer, initialState, enhancer)

  return { store, history }
}

export default initStore
