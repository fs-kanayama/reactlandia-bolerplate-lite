import _ from 'lodash'
import { NOT_FOUND } from 'redux-first-router'

const routes = {
  HOME: { path: '/', page: 'Home' },
  ABOUT: { path: '/about', page: 'About' },
  THING: { path: '/thing/:id?', page: 'Thing' },
  NESTED: { path: '/tree/:nest/:bird?', page: 'NestedBird' },

  // More on path parameters of 'redux-first-router':
  // https://github.com/faceyspacey/redux-first-router/issues/83#issuecomment-327703226
}

// Here for simplicity. Doesn't have to be
const thingIds = [
  '0', '1', '2', 'amazing-thingy',
]

const routesMap = _.mapValues(routes, route => route.path)

const pagesMap = {
  ...(_.mapValues(routes, route => route.page)),
  [NOT_FOUND]: 'NotFound',
}

// ( URL -> HTML filename ) mapping for static site export
let staticMap = _.reduce(_.values(routes), (result, value) => {
  // For root URL we generate "index.html" in the root of static site
  if(value.path === '/') {
    // Rename "Home" to "index"
    result[value.path] = 'index'
  }

  // For nested URLs we generate HTML in subdirectories: "/thing/0.thml"
  else if(value.path.startsWith('/thing')) {
    // One without ID becomes "index.html" of the subdirectory
    result['/thing'] = 'thing/index'

    // One page for every ID
    thingIds.map(thing => result[`/thing/${thing}`] = `thing/${thing}`)
  }

  // All other pages go to files with corresp. lowercase names
  else {
    result[value.path] = value.page.toLowerCase()
  }

  return result
}, {})

staticMap = {
  ...staticMap,
  NOT_FOUND: '404', // add "404.html" for "Not Found" requests
}

export { routesMap, pagesMap, staticMap }
