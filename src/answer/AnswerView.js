import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

import _evaluateCondition from './_evaluateCondition'

import './AnswerView.css'

class AnswerView extends Component {

  render () {

    const answerData = this.props.answerData
    const rulesData = this.props.law['勞動基準法']
    const lawObject = this.props.lawObject
    let count = {
      'passed': 0,
      'failed': 0,
      'NA': 0
    }

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
    if (answerData && rulesData) {
      resultJSX = Object.keys(rulesData).map((key) => {

        if (key === '0') {
          return
        }

        return rulesData[key].map((ruleSet, index) => {
          if (!ruleSet) {
            return
          }

          let evaluateConditionJSX
          let hintJSX

          if (ruleSet.precondition && _evaluateCondition(ruleSet.precondition, answerData) !== 'passed') {

            evaluateConditionJSX = '不適用'
            count.NA += 1

          } else {

            if (_evaluateCondition(ruleSet.condition, answerData) === 'passed') {
              evaluateConditionJSX = <span className='ui green basic tiny label'><i className='icon checkmark' />通過</span>
              count.passed += 1
            }

            if (_evaluateCondition(ruleSet.condition, answerData) === 'failed') {
              evaluateConditionJSX = <span className='ui red tiny label'><i className='icon remove' />不通過</span>
              count.failed += 1
            }

            const targetListJSX = ruleSet.condition.rule.map((item, number, arr) => {
              return (
                <div className='item' key={number}>
                <span className='code'>
                  {item.target}
                </span>
                </div>
              )
            })

            hintJSX = (
              <div className='ui list'>
                {targetListJSX}
              </div>
            )
          }

          return (
            <div className='item' key={index}>
              <div className='content'>
                <header className='header'>
                  勞動基準法第 {key} 條
                  { ruleSet.reference.paragraph.length > 0 ? `第 ${ruleSet.reference.paragraph} 項` : ''}
                  { ruleSet.reference.subparagraph.length > 0 ? `第 ${ruleSet.reference.subparagraph} 款` : ''}
                </header>
                <p className='meta'>
                  {lawObject[key].note.replace('(','').replace(')','')}
                </p>
                {hintJSX}
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
            <div className='ui secondary three item menu' style={{marginTop: "-1rem"}}>
              <a className='item'>
                通過
                <span className='ui green mini label'>
                  {count.passed}
                </span>
              </a>
              <a className='item'>
                不通過
                <span className='ui red mini label'>
                  {count.failed}
                </span>
              </a>
              <a className='item'>
                不適用
                <span className='ui mini label'>
                  {count.NA}
                </span>
              </a>
            </div>
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
