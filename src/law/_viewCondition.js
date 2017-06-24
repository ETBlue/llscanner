import React from 'react'

import _viewRule from '../_shared/_viewRule'
import _compactList from '../_shared/_compactList'

import './_viewCondition.css'

export default (ruleData, id) => {

  const emptyJSX = (
    <div className='_viewCondition ui divided relaxed list'>
      <div className='item'>
        無
      </div>
    </div>
  )

  if (!ruleData) {
    return emptyJSX
  }

  let ruleJSX = ruleData.map(( entry, index ) => {
    if (!entry.precondition || !entry.precondition.rule || entry.precondition.rule.length === 0 ) {
      if (!entry.condition || !entry.condition.rule || entry.condition.rule.length === 0) {
        return false
      }
    }

    let preconditionJSX
    let preconditionEnding
    if (entry.precondition && entry.precondition.rule) {
      preconditionJSX = _viewRule(entry.precondition.rule, entry.precondition.logic)
      preconditionEnding = '的情況下，'
    }
    let conditionJSX
    let conditionEnding
    let conditionOpening
    if (entry.condition && entry.condition.rule) {
      conditionJSX = _viewRule(entry.condition.rule, entry.condition.logic)
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
        <div>本條文{ paragraphText }{ subparagraphText }規定：</div>
        <div className='list'>{ preconditionJSX }</div>
        <div>{ preconditionEnding }{ conditionOpening }</div>
        <div className='list'>{ conditionJSX }</div>
        <div>{ conditionEnding }</div>
      </div>
    )
  })

  ruleJSX = _compactList(ruleJSX)

  if (ruleJSX.length === 0) {
    return emptyJSX
  }

  return (
    <div className='_viewCondition ui divided relaxed list'>
      {ruleJSX}
    </div>
  )

}
