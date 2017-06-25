import React from 'react'

export default (route) => {

  if (route && route.map) {
    const listJSX = route.map((entry, index) => {
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
