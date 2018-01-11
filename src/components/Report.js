import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import PropTypes from 'prop-types'

const Report = ({report}) => {
  console.log(report)
  return (
    <section className='Report ui basic center aligned segment'>
      <h1 className='ui header'>掃描報告</h1>
      <p>某段敘述文字</p>
      <hr className='ui hidden divider' />
      <Link to='/' className='ui icon labeled right button'>
        重來
        <i className='icon right chevron'></i>
      </Link>
    </section>
  )
}

Report.proptypes = {
}

export default Report
