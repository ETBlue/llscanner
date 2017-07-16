import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

import _fixYear from '../_shared/_fixYear.js'

class LawChooser extends Component {

  render () {

    const laws = this.props.laws
    const answerID = this.props.answerID
    const currentLawID = this.props.currentLaw
    const _toggleChooser = this.props._toggleChooser

    let lawListJSX

    if (laws) {

      lawListJSX = Object.keys(laws).map((lawID, key) => {

        const lawTitle = laws[lawID].title
        //const versionJSX = lawData.versions.map((item, index) => {
        //  return <div key={index}>{_fixYear(item)}</div>
        //})

        return (
          <Link to={`/answer/${answerID}/${lawTitle}/`} 
            className={'item' + (currentLawID === lawTitle ? ' active' : '')}
            key={key}
            onClick={_toggleChooser}
          >
            {lawTitle}
            <i className='right arrow icon' />
          </Link>
        )
      })

    }

    return (
      <section className='LawChooser ui vertical fluid menu'>
        <div className='header item'>
          選擇掃描工具
        </div>
        {lawListJSX}
      </section>
    )
  }
}

export default LawChooser
