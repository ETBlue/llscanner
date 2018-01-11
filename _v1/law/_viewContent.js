import React from 'react'

export default (articleContent) => {

  const lines = articleContent.replace(/　　/g, '').split('\n')
  const paragraphJSX = lines.map((paragraph, part) => {
    return (
      <div key={part} className='item'>
        {paragraph}
      </div>
    )
  })
  return (
    <div className='_viewContent ui divided relaxed list'>
      {paragraphJSX}
    </div>
  )

}
