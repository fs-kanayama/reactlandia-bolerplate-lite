import React from 'react'

import { indexFromPath, nextIndex, pages } from '../utils'
import UniversalPage from './UniversalPage'

export default class App extends React.Component {
  render() {
    const { index, done, loading } = this.state
    const page = pages[index]

    // console.log(page)

    return (
      <>
        <h1>
          Hello Reactlandia
        </h1>

        <UniversalPage page={page}/>

        <button type='button' onClick={this.changePage}>
          {this.buttonText()}
        </button>
      </>
    )
  }

  constructor(props) {
    super(props)

    const { history } = props
    const index = indexFromPath(history.location.pathname)

    this.state = {
      index,
      loading: false,
      done: false,
      error: false,
    }

    history.listen(({ pathname }) => {
      const index = indexFromPath(pathname)
      this.setState({ index })
    })
  }

  changePage = () => {
    const { loading, index } = this.state
    const { history } = this.props
    if(loading) return

    const idx = nextIndex(index)
    const page = pages[idx]

    history.push(`/${page}`)
  }

  beforeChange = ({ isSync }) => {
    if(!isSync) {
      this.setState({ loading: true, error: false })
    }
  }

  afterChange = ({ isSync, isServer, isMount }) => {
    if(!isSync) {
      this.setState({ loading: false, error: false })
    }
    else if(!isServer && !isMount) {
      this.setState({ done: true, error: false })
    }
  }

  handleError = error => {
    this.setState({ error: true, loading: false })
  }

  buttonText() {
    const { loading, error } = this.state
    if(error) return 'ERROR'
    return loading ? 'LOADING...' : 'CHANGE PAGE'
  }
}
