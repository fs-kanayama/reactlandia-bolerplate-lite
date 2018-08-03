import universal from 'react-universal-component'

import Loading from './Loading'
import NotFound from './NotFound'

const UniversalPage = universal(({ page }) => import(`../pages/${page}`), {
  timeout: 10000,
  loading: Loading,
  error: NotFound,
})

export default UniversalPage
