import React from 'react'

export default (route) => {

  if (route) {
    const listJSX = Object.keys(route).map((key) => {
      return (
        <div key={key} className='item'>
          回答 <code className='code'>{route[key].id}</code> 則導向 <code className='code'>{route[key].quiz}</code>
        </div>
      )
    })
    return (
      <div className='RouteView ui divided relaxed list'>
        {listJSX}
      </div>
    )
  } else {
    return '預設'
  }

}
