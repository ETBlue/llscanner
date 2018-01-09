import React from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import PropTypes from 'prop-types'

const Header = ({view, userID, userName, userRole}) => (
  <nav className='Header ui secondary menu' style={{marginBottom: '0'}}>
    <NavLink exact to='/' className='item'>
      勞基法掃描器
      <span className='ui olive label' >
      alpha
      </span>
      {view === 'admin' ? 'Dashboard': ''}
    </NavLink>
    <div className='right floated item'>
      {userID ? userName : <span><i className="icon sign in"></i>登入</span>}
    </div>
  </nav>
)

Header.proptypes = {
}

export default Header
