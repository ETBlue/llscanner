import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import _fixYear from '../_shared/_fixYear'
import _parseArticleID from '../_shared/_parseArticleID'
import _getLogic from '../_shared/_getLogic'

class ArticleList extends Component {

  render () {
    let articleListJSX
    const lawData = this.props.lawData
    const ruleData = this.props.ruleData

    if (lawData && lawData.law_data) {
      articleListJSX = lawData.law_data.map((article, index) => {
        if (article.rule_no) {
          const id = _parseArticleID(article.rule_no)
          let relatedJSX

          if (article.relates) {
            relatedJSX = Object.keys(article.relates).map((relation) => {
              const relationJSX = article.relates[relation].map((law, order) => {
                const item = article.relates[relation][order]
                return item.numbers.map((number) => {
                  return (
                    <div key={number} className='item'>
                      <i className={'icon arrow ' + (relation === '被引用條文' ? 'right' : 'left')} />
                      <div className='content'>
                        <Link to={'/law/' + item.law_name + '/' + _parseArticleID(number)} >
                          {`${item.law_name}　${number}`}
                        </Link>
                      </div>
                    </div>
                  )
                })
              })
              return (
                <div key={relation} className='ui vertical segment'>
                  <div className='ui relaxed list'>
                    {relationJSX}
                  </div>
                </div>
              )
            })
          }

          const lines = article.content.replace(/　　/g, '').split('\n')
          const paragraphJSX = lines.map((paragraph, part) => {
            return (
              <div key={part} className='item'>
                {paragraph}
              </div>
            )
          })

          let ruleJSX
          if (ruleData && ruleData[id]) {
          const rules = ruleData[id]
          if( rules ) {
            ruleJSX = rules.map(( entry, index ) => {
              let preconditionJSX
              let preconditionEnding
              const preconditionRules = entry.precondition.rule
              if (entry.precondition && preconditionRules.length > 0) {
                preconditionJSX = preconditionRules.map(( rule, index ) => {
                  let prefixText
                  if (index === 0) {
                    prefixText = '在'
                  } else if (entry.precondition.logic === 'and') {
                    prefixText = '且'
                  } else if (entry.precondition.logic === 'or') {
                    prefixText = '或'
                  }
                  return (
                    <div className='item' key={index}>
                      { prefixText } <code className='code'>{ rule.target }</code> { _getLogic(rule.logic) } <code className='code'>{rule.value}</code>
                    </div>
                  )
                })
                preconditionEnding = '的情況下，'
              }
              let conditionJSX
              let conditionEnding
              let conditionOpening
              const conditionRules = entry.condition.rule
              if (entry.condition && conditionRules.length > 0) {
                conditionJSX = conditionRules.map(( rule, index ) => {
                  let prefixText
                  let postfixText
                  if (index === 0) {
                  } else if (entry.condition.logic === 'and') {
                    prefixText = '且'
                  } else if (entry.condition.logic === 'or') {
                    prefixText = '或'
                  }
                  return (
                    <div className='item' key={index}>
                      { prefixText } <code className='code'>{ rule.target }</code> { _getLogic(rule.logic) } <code className='code'>{rule.value}</code>
                    </div>
                  )
                })
                conditionOpening = '需符合'
                conditionEnding = '的條件，才屬合法'
              }
              let paragraphText
              let subparagraphText
              if (entry.reference && entry.reference.paragraph) {
                paragraphText = `第 ${entry.reference.paragraph} 項`
              }
              if (entry.reference && entry.reference.subparagraph) {
                subparagraphText = `第 ${entry.reference.subparagraph} 款`
              }
              return (
                <div key={index}>
                  <div>本條文 { paragraphText }{ subparagraphText } 規定：</div>
                  <div className='ui list'>{ preconditionJSX }</div>
                  <div>{ preconditionEnding }{ conditionOpening }</div>
                  <div className='ui list'>{ conditionJSX }</div>
                  <div>{ conditionEnding }</div>
                </div>
              )
            })
          }
          }

          return (
            <tr key={article.rule_no}>
              <td className='top aligned'>
                <h4 className='ui header'>
                  <Link to={'/law/' + lawData.title + '/' + id}>
                    {article.rule_no.replace(' ', '')}
                  </Link>
                  <div className='sub header'>
                    {article.note.replace('(', '').replace(')', '')}
                  </div>
                </h4>
              </td>
              <td className='top aligned'>
                <div className='ui divided relaxed list'>
                  { paragraphJSX }
                </div>
              </td>
              <td className='top aligned'>
                { ruleJSX }
              </td>
              <td className='top aligned'>
                { relatedJSX }
              </td>
            </tr>
          )
        } else if (article.section_name) {
          return (
            <tr key={article.section_name}>
              <td className='top aligned'>
                <h4 className='ui header'>
                  {article.section_name.split('  ')[0]}
                  <div className='sub header'>
                    {article.section_name.split('  ')[1]}
                  </div>
                </h4>
              </td>
              <td className='top aligned'>
              </td>
              <td className='top aligned'>
              </td>
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
