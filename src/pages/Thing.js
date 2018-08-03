import React from 'react'


const Thing = ({ id = 1 }) => {
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

export default Thing
