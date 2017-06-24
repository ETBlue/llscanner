import React from 'react'

import _viewLogic from './_viewLogic'
import _viewListString from './_viewListString'

export default (list, logic) => {

  return list.map(( rule, index ) => {
    let prefixText
    if (index === 0) {
      prefixText = ''
    } else if (logic === 'and') {
      prefixText = '且'
    } else if (logic === 'or') {
      prefixText = '或'
    }
    return (
      <div className='item' key={index}>
        { prefixText } <code className='code'>{ rule.target }</code> { _viewLogic(rule.logic) } {_viewListString(rule.value)}
      </div>
    )
  })

}
