import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class ArticleView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lawID: this.props.lawID,
      articleID: this.props.articleID,
      content: this.props.articleContent,
      rules: this.props.rules,
    }
  }

  render () {
    return (
      <section className='ArticleView'>
        <div className='Article ui basic segment'>
          <h3 className='ui header'>
            <Link to={'/law/' + this.props.lawID}>{this.props.lawID}</Link>
          </h3>
          <p>
            {this.props.articleContent.rule_no}　
            {this.props.articleContent.note.replace('(', '').replace(')', '')}
          </p>
          <hr className='ui hidden divider' />
          <div className='ui two column stackable grid'>
            <div className='column'>
              <h4 className='ui block header'>進入條件</h4>
              {`conditionJSX`}
            </div>
            <div className='column'>
              <h4 className='ui block header'>離開路徑</h4>
              {`routeJSX`}
            </div>
          </div>
          <hr className='ui hidden divider' />
        </div>
      </section>
    )
  }
}

export default ArticleView
