import React from 'react'
import { connect } from 'react-redux'
import universal from 'react-universal-component'

import Loading from './Loading'
import NotFound from './NotFound'

const UniversalPage = universal(({ page }) => import(`../pages/${page}`), {
  minDelay: 300,
  alwaysDelay: true,
  loading: Loading,
  error: NotFound,
  loadingTransition: true,
  usesBabelPlugin: true,
  ignoreBabelRename: true,
})

const Switcher = ({ page }) => {
  return <UniversalPage page={page}/>
}

const mapState = ({ page }) => ({ page })

export default connect(mapState)(Switcher)

