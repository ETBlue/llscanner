import React from 'react'

export default (item) => {

  if (item && item.route && item.route.map) {
    const listJSX = item.route.map((entry, index) => {
      return (
        <div key={index} className='item'>
          回答 <code className='code'>{entry.answer}</code> 則導向 <code className='code'>{entry.next}</code>
        </div>
      )
    })
    return (
      <div className='_viewRoute ui divided relaxed list'>
        {listJSX}
      </div>
    )
  } else {
    return '預設'
  }

}
