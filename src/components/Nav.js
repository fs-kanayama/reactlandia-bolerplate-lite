import _ from 'lodash'
import React from 'react'

import { NavLink } from 'redux-first-router-link'

import './Nav.css'

const links = {
  '/': 'Home',
  '/about': 'About',
  '/thing': 'Thing',
  '/thing/0': 'Thing 0',
  '/thing/1': 'Thing 1',
  '/thing/2': 'Thing 2',
  '/thing/amazing-thingy': 'Thing "Amazing Thingy"',
  '/tree/upper/red': 'Nest: upper, Bird: red',
  '/tree/left/blue': 'Nest: left, Bird: blue',
  '/tree/right': 'Nest: right, Bird: none',
  '/does-not-exist': 'Does not exist',
}

const Nav = () => (
  <div className='nav'>
    {
      _.map(links, (text, url) =>
        <NavLink
          to={url}
          activeClassName='active'
          isActive={(match, location) => (location.pathname === url)}
          key={url}
        >
          {text}
        </NavLink>,
      )
    }
  </div>
)


export default Nav

