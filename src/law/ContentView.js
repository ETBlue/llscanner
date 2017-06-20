import React, { Component } from 'react'

class ContentView extends Component {

  render () {
    const lines = this.props.articleContent.replace(/　　/g, '').split('\n')
    const paragraphJSX = lines.map((paragraph, part) => {
      return (
        <div key={part} className='item'>
          {paragraph}
        </div>
      )
    })
    return (
      <div className='ContentView ui divided relaxed list'>
        {paragraphJSX}
      </div>
    )
  }
}

export default ContentView
