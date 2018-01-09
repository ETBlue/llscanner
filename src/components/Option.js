import React from 'react'
import {HashLink as Link} from 'react-router-hash-link'
import PropTypes from 'prop-types'

const Option = ({title, link, onClick}) => (
  <Link to={`/${link}`} className='Option ui button' onClick={onClick} style={{margin: '0 1rem 1rem 0'}} >
    {title}
  </Link>
)

Option.proptypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Option
