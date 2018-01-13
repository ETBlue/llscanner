import React from 'react'
import PropTypes from 'prop-types'

const Footer = () => (
  <section className='Footer' style={{textAlign: 'center', margin: '1rem 0', padding: '1rem 0'}} >
  <hr className='ui divider'/>
  <p style={{opacity: '0.6'}}>
    Yet another open data experiment by ETBlue.
  </p>
  <p style={{opacity: '0.6'}}>
    <a href='https://github.com/ETBlue/llscanner' target='_blank' >
    <i className='icon code'></i>
    Source code
    </a>
    　
    <a href='https://docs.google.com/spreadsheets/d/1Qp_U-zGJmvaXO0WA8LWRKh3Npsq5nitMxnQ7JE1KuHQ/edit?usp=sharing' target='_blank' >
    <i className='icon table'></i>
    Data
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
