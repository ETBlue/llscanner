import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

import ResultView from './ResultView'

class AnswerView extends Component {

  render () {

    const answerData = this.props.answerData
    const rulesData = this.props.law['勞動基準法']
    const lawObject = this.props.lawObject

    let answerDataJSX
    if (answerData) {
      answerDataJSX = Object.keys(answerData).map((key, index) => {
        return (
          <div key={key} className='item'>
            <div className='header'>
              <span className='code'>
              {key}
              </span>
            </div>
            <div className='right floated content'>
              {answerData[key]}
            </div>
          </div>
        )
      });
    }

    return (
      <section className='AnswerView ui basic segment'>
        <h2 className='ui header'>
          testdata
        </h2>
        <hr className='ui hidden divider' />
        <div className='ui two column stackable grid'>
          <div className='left aligned column'>
            <h4 className='ui dividing header'>測驗答案</h4>
            <div className='ui divided relaxed list'>
              {answerDataJSX}
            </div>
          </div>
          <div className='left aligned column'>
            <ResultView
              answerData={answerData}
              rulesData={rulesData}
              lawObject={lawObject}
              lawTitle='勞動基準法'
            />
          </div>
        </div>
      </section>
    )
  }
}

export default AnswerView
