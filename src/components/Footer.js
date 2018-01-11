import React from 'react'
import PropTypes from 'prop-types'

const Footer = () => (
  <section className='ui basic center aligned segment' >
  <hr className='ui divider'/>
  <p style={{opacity: '0.6'}}>
    Yet another open data experiment by ETBlue.
    　
    <a href='https://github.com/ETBlue/llscanner' target='_blank' >
    <i className='icon code'></i>
    Source code
    </a>
    　
    <a href='https://www.facebook.com/ETBlue/media_set?set=a.10209533675351463.1073741859.1014354995&type=3' target='_blank' >
    <i className='icon photo'></i>
    Dev log
    </a>
  </p>
  </section>
)

Footer.proptypes = {
}

export default Footer
