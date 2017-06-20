import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'
import _parseArticleID from '../_shared/_parseArticleID'
import './RelationView.css'

class RelationView extends Component {

  render () {
    const relationData = this.props.relationData
    const currentLaw = this.props.currentLaw

    let relatedJSX
    if (relationData) {
      relatedJSX = Object.keys(relationData).map((relation) => {
        const relationJSX = relationData[relation].map((law, order) => {
          const item = relationData[relation][order]
          const displayedLawName = item.law_name === currentLaw ? '' : `${item.law_name}：`
          return item.numbers.map((number) => {
            return (
              <div key={number} className='item'>
                <i className={'icon arrow ' + (relation === '被引用條文' ? 'right' : 'left')} />
                <div className='content'>
                  <Link to={'/law/' + item.law_name + '#' + _parseArticleID(number)} >
                    {`${displayedLawName}${number}`}
                  </Link>
                </div>
              </div>
            )
          })
        })
        return (
          <div key={relation} className='item'>
            <div className='list'>
              {relationJSX}
            </div>
          </div>
        )
      })
    }
    return (
      <div className='RelationView ui relaxed divided list'>
        {relatedJSX}
      </div>
    )
  }
}

export default RelationView
