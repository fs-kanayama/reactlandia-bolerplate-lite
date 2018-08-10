import _ from 'lodash'
import { NOT_FOUND } from 'redux-first-router'

const routes = {
  HOME: { path: '/', page: 'Home' },
  ABOUT: { path: '/about', page: 'About' },
  THING: { path: '/thing/:id?', page: 'Thing' },

  // More on path parameters of 'redux-first-router':
  // https://github.com/faceyspacey/redux-first-router/issues/83#issuecomment-327703226
}

const routesMap = _.mapValues(routes, route => route.path)

const pagesMap = {
  ...(_.mapValues(routes, route => route.page)),
  [NOT_FOUND]: 'NotFound',
}

const paths = _.mapKeys(routes, (route) => route.path)

export { routesMap, pagesMap, paths }
