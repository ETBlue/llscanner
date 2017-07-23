import React from 'react'

export default (item) => {

  if (!item) {
    return null
  }

  if (!item.route) {
    return '預設'
  }

  const hash = item.route
  const listJSX = Object.keys(hash).map((key) => {
    if (!hash[key]) {
      return null
    }
    return (
      <div key={key} className='item'>
        回答 <code className='code'>{key}</code> 則導向 <code className='code'>{hash[key]}</code>
      </div>
    )
  })
  return (
    <div className='_viewRoute ui divided relaxed list'>
      {listJSX}
    </div>
  )

}
