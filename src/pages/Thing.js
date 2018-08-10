import React from 'react'
import { connect } from 'react-redux'

import './Thing.css'

const Thing = ({ id }) => {
  return (
    <>
      <h1 className='thing'>
        Thing
      </h1>

      <p className='btn btn-thing'>
        Thing {id && <b>{id}</b>}
      </p>
    </>
  )
}

const mapStateToProps = ({ location }) => ({ id: location.payload.id })

export default connect(mapStateToProps)(Thing)
