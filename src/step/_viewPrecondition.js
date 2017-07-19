import React from 'react'

import _viewRule from '../_shared/_viewRule'

export default (item) => {

  if (!item || !item.precondition || !item.precondition.rule) {
    return '無'
  }

  return (
    <div className='_viewPrecondition ui relaxed list'>
      {_viewRule(item.precondition.rule, item.precondition.logic)}
      <div className='item'>的情況下，顯示本題</div>
    </div>
  )

}
