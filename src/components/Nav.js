import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'

import Link from 'redux-first-router-link'


const links = {
  '/': 'Home',
  '/about': 'About',
  '/thing': 'Thing',
  '/thing/0': 'Thing 0',
  '/thing/1': 'Thing 1',
  '/thing/2': 'Thing 2',
  '/thing/amazing-thingy': 'Thing "Amazing Thingy"',
  '/does-not-exist': 'Does not exist',
}

const Nav = () => (
  <div>
    <ul>
      {
        _.map(links, (text, url) =>
          <li key={url + ': ' + text}>
            <Link to={url}>
              {text}
            </Link>
          </li>)
      }
    </ul>
  </div>
)

export default connect()(Nav)
