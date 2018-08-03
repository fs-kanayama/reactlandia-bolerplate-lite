import React from 'react'


class Home extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render = () => {
    return (
      <>
        <h1 className='home'>
          Home
        </h1>

        <p className='btn btn-home'>
          Home
        </p>
      </>
    )
  }
}

export default Home
