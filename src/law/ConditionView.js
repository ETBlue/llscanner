import React, { Component } from 'react'
import _getLogic from '../_shared/_getLogic'
import './ConditionView.css'

class ConditionView extends Component {

  render () {

    const ruleData = this.props.ruleData
    const id = this.props.articleID

    let ruleJSX
    if ( ruleData && ruleData[id] ) {
      const rules = ruleData[id]
      if ( rules ) {
        ruleJSX = rules.map(( entry, index ) => {
          let preconditionJSX
          let preconditionEnding
          if (entry.precondition && entry.precondition.rule) {
            preconditionJSX = entry.precondition.rule.map(( rule, index ) => {
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
          if (entry.condition && entry.condition.rule) {
            conditionJSX = entry.condition.rule.map(( rule, index ) => {
              let prefixText
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
            <div key={index} className='item'>
              <div>本條文 { paragraphText }{ subparagraphText } 規定：</div>
              <div className='list'>{ preconditionJSX }</div>
              <div>{ preconditionEnding }{ conditionOpening }</div>
              <div className='list'>{ conditionJSX }</div>
              <div>{ conditionEnding }</div>
            </div>
          )
        })
      }
    }

    return (
      <div className='ConditionView ui divided relaxed list'>
        {ruleJSX}
      </div>
    )
  }
}

export default ConditionView
