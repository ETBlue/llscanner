import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

import _evaluateCondition from './_evaluateCondition'

class AnswerView extends Component {

  render () {

    const answerData = this.props.answerData
    const lawData = this.props.law['勞動基準法']

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

    let resultJSX
    if (answerData && lawData) {
      resultJSX = Object.keys(lawData).map((key) => {

        if (key === '0') {
          return
        }

        return lawData[key].map((ruleSet, index) => {
          if (!ruleSet) {
            return
          }

          if (ruleSet.precondition && _evaluateCondition(ruleSet.precondition, answerData) !== 'passed') {
            return
          }

          let evaluateConditionJSX

          if (_evaluateCondition(ruleSet.condition, answerData) === 'passed') {
            evaluateConditionJSX = <span className='ui green basic tiny label'><i className='icon checkmark' />passed</span>
          }

          if (_evaluateCondition(ruleSet.condition, answerData) === 'failed') {
            evaluateConditionJSX = <span className='ui red tiny label'><i className='icon remove' />failed</span>
          }

          return (
            <div className='item' key={index}>
              <div className='header'>
                勞動基準法第 {key} 條
                { ruleSet.reference.paragraph.length > 0 ? `第 ${ruleSet.reference.paragraph} 項` : ''}
                { ruleSet.reference.subparagraph.length > 0 ? `第 ${ruleSet.reference.subparagraph} 款` : ''}
              </div>
              <div className='right floated content'>
                {evaluateConditionJSX}
              </div>
            </div>
          )
        })

      })
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
            <h4 className='ui dividing header'>掃描結果</h4>
            <div className='ui divided relaxed list'>
              {resultJSX}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default AnswerView
