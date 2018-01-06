import React from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import PropTypes from 'prop-types'

const Header = ({view, userID, userName, userRole}) => (
  <div className='Header ui secondary menu'>
    <NavLink exact to='/' className='item'>
      LLScanner {view === 'admin' ? 'Dashboard': ''}
    </NavLink>
    <div className='right floated item'>
      {userID ? userName : 'login'}
    </div>
  </div>
)

Header.proptypes = {
}

export default Header
