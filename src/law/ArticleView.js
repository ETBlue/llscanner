import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

import _viewCondition from './_viewCondition'
import _viewContent from './_viewContent'

class ArticleView extends Component {

  render () {

    const articleData = this.props.articleData
    const ruleData = this.props.ruleData
    const articleID = this.props.articleID
    const lawID = this.props.lawID

    return (
      <section className='ArticleView ui basic segment'>
        <h2 className='ui header'>
          <Link to={'/law/' + lawID}>{lawID}</Link>
        </h2>
        <h3 className='ui header'>
          {articleData.rule_no}
          <div className='sub header'>
          {articleData.note.replace('(', '').replace(')', '')}
          </div>
        </h3>
        <hr className='ui hidden divider' />
        <div className='ui two column stackable grid'>
          <div className='left aligned column'>
            <h4 className='ui dividing header'>條文</h4>
            {_viewContent(articleData.content)}
          </div>
          <div className='left aligned column'>
            <h4 className='ui dividing header'>規則</h4>
            {_viewCondition(ruleData, articleID)}
          </div>
        </div>
      </section>
    )
  }
}

export default ArticleView
