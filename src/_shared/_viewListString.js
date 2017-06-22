import React from 'react'

export default (list) => {

  return list.split(',').map((str, index, arr) => {
    return (
      <span key={str}>
        <code className='code'>{str.trim()}</code>
        {index < arr.length - 1 ? '、' : '' }
      </span>
    )
  })

}
