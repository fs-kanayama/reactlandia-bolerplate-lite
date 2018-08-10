import React from 'react'
import { connect } from 'react-redux'
import universal from 'react-universal-component'

import Loading from './Loading'
import NotFound from './NotFound'

const UniversalPage = universal(({ page }) => import(`../pages/${page}`), {
  loading: Loading,
  error: NotFound,
})

const Switcher = ({ page }) => {
  return <UniversalPage page={page}/>
}

const mapState = ({ page }) => ({ page })

export default connect(mapState)(Switcher)

