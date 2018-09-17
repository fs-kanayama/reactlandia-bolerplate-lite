import React from 'react'
import { css } from 'linaria'

import './Home.css'

const title = css`
  text-transform: uppercase;
`


class Home extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render = () => {
    return (
      <>
        <h1 className={`home ${title}`}>
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
