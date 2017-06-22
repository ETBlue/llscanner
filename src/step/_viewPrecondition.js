import React from 'react'

import _viewRule from '../_shared/_viewRule'

export default (precondition) => {

  if (precondition && precondition.rule) {

    return (
      <div className='_viewPrecondition ui relaxed list'>
        {_viewRule(precondition.rule, precondition.logic)}
        <div className='item'>的情況下，顯示本題</div>
      </div>
    )

  } else {
    return '無'
  }

}
