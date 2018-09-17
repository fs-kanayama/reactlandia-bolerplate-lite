import React from 'react'
import { connect } from 'react-redux'

import './NestedBird.css'

const NestedBird = ({ nest, bird }) => {
  return (
    <>
      <h1 className='nested-bird'>
        🐦 Nested Bird
      </h1>

      <p>
        {nest && <>Nest:<b>{nest}</b></>}
      </p>
      <p>
        {bird ? <>Bird: <b>{bird}</b></> : 'empty'}
      </p>
    </>
  )
}

const mapStateToProps = ({ location }) => ({
  nest: location.payload.nest,
  bird: location.payload.bird,
})

export default connect(mapStateToProps)(NestedBird)

