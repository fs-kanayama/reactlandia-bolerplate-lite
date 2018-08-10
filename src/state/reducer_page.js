import { pagesMap } from '../routes'


const initialStatePage = {
  page: pagesMap.HOME,
}

const reducerPage = (state = initialStatePage, action = {}) =>
  pagesMap[action.type] || state

export { reducerPage, initialStatePage }
