import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

import _fixYear from '../_shared/_fixYear'
import _parseArticleID from '../_shared/_parseArticleID'

import _viewCondition from './_viewCondition'
import _viewContent from './_viewContent'
import _viewRelation from './_viewRelation'
import './ArticleList.css'

class ArticleList extends Component {

  render () {
    let articleListJSX
    const lawData = this.props.lawData
    const rulesData = this.props.rulesData

    if (lawData && lawData.law_data) {
      articleListJSX = lawData.law_data.map((article, index) => {
        if (article.rule_no) {
          const id = _parseArticleID(article.rule_no)
          const ruleData = rulesData? rulesData[id] : null
          return (
            <tr key={article.rule_no} id={id}>
              <td className='top aligned'>
                <h4 className='ui header'>
                  <Link to={`/law/${lawData.title}/${id}/`}>
                    {article.rule_no.replace(' ', '')}
                  </Link>
                  <div className='sub header'>
                    {article.note.replace('(', '').replace(')', '')}
                  </div>
                </h4>
              </td>
              <td className='top aligned'>
                {_viewContent(article.content)}
              </td>
              <td className='top aligned'>
                {_viewCondition(ruleData, id)}
              </td>
              <td className='top aligned'>
                {_viewRelation(article.relates, lawData.title)}
              </td>
            </tr>
          )
        } else if (article.section_name) {
          return (
            <tr className='header' key={article.section_name}>
              <td className='top aligned'>
                <h4 className='ui header'>
                  {article.section_name.split('  ')[0]}
                  <div className='sub header'>
                    {article.section_name.split('  ')[1]}
                  </div>
                </h4>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )
        } else {
          return null
        }
      })
    }

    return (
      <div className='ArticleList ui basic segment'>
        <h2 className='ui header'>
          {lawData.title}
          <div className='sub header'>
            {lawData.versions.map((string) => { return _fixYear(string) }).join('　')}
          </div>
        </h2>
        <table className='ui table'>
          <thead>
            <tr>
              <th className='three wide'>條號</th>
              <th className='five wide'>預覽</th>
              <th className='five wide'>規則</th>
              <th className='three wide'>關連</th>
            </tr>
          </thead>
          <tbody>
            { articleListJSX }
          </tbody>
        </table>
      </div>
    )
  }
}

export default ArticleList
