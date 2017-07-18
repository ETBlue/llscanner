import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

import _viewLogic from '../_shared/_viewLogic'

import _evaluateCondition from './_evaluateCondition'
import LawChooser from './LawChooser'

import './ResultView.css'

class ResultView extends Component {

  constructor(props) {

    super(props)

    this.state = {
      filter: 'all',
      chooser: false,
    }

    this._filter = this._filter.bind(this)
    this._toggleChooser = this._toggleChooser.bind(this)

  }

  _filter(event) {

    const filter = event.target.getAttribute('data-filter')
    this.setState((prevState, props) => {
      prevState.filter = filter
      return prevState
    })

  }

  _toggleChooser() {

    this.setState((prevState, props) => {
      prevState.chooser = !prevState.chooser
      return prevState
    })

  }

  render () {

    const answerData = this.props.answerData
    const rulesData = this.props.rulesData
    const lawObject = this.props.lawObject
    const lawTitle = this.props.lawTitle
    const laws = this.props.laws
    const lawID = this.props.lawID

    let count = {
      'all': 0,
      'passed': 0,
      'failed': 0,
      'unknown': 0,
      'NA': 0
    }

    let resultJSX
    if (answerData && rulesData) {
      resultJSX = Object.keys(rulesData).map((key) => {

        // 略過 placeholder

        if (key === '0' || rulesData[key] === 'placeholder' ) {
          return
        }

        // 處理正常的資料

        return rulesData[key].map((ruleSet, index) => {

          if (!ruleSet) {
            return
          }

          let evaluateConditionJSX
          let targetListJSX
          let hintJSX

          const preconditionOutput = _evaluateCondition(ruleSet.precondition, answerData)
          const conditionOutput = _evaluateCondition(ruleSet.condition, answerData)

          // 遇到不適用的條款時

          if (ruleSet.precondition && preconditionOutput.result !== 'passed') {

            if (preconditionOutput.result === 'unknown') {

              count.unknown += 1
              count.all += 1

              // 被 filter 擋掉的話，直接不 render
              if (this.state.filter !== 'all' && this.state.filter !== 'unknown') {
                return
              } 

              evaluateConditionJSX = '可能不適用'

            }

            if (preconditionOutput.result === 'failed') {

              count.NA += 1
              count.all += 1

              // 被 filter 擋掉的話，直接不 render
              if (this.state.filter !== 'all' && this.state.filter !== 'NA') {
                return
              } 

              evaluateConditionJSX = '不適用'

            }

          // 遇到適用的條款時

          } else {

            if (conditionOutput.result === 'passed') {
              count.passed += 1
              count.all += 1

              evaluateConditionJSX = <span className='ui green basic tiny label'><i className='icon checkmark' />通過</span>
            }

            if (conditionOutput.result === 'failed') {
              count.failed += 1
              count.all += 1

              evaluateConditionJSX = <span className='ui red tiny label'><i className='icon remove' />不通過</span>
            }

            if (conditionOutput.result === 'unknown') {
              count.unknown += 1
              count.all += 1

              evaluateConditionJSX = <span className='ui yellow basic tiny label'><i className='icon help' />未知</span>
            }

            // 被 filter 擋掉的話，不 render
            if (this.state.filter !== 'all' && this.state.filter !== conditionOutput.result) {
              return
            } 
          }

          targetListJSX = conditionOutput.hint.map((item, number) => {
            return (
              <div className='item' key={number}>
                <header className='header'>
                  <span className='code'>
                    {item.name}
                  </span>
                </header>
                <div className='meta'>
                  期望
                  <span className='code'>
                    {item.target}
                  </span>
                  {_viewLogic(item.logic)}
                  <span className='code'>
                    {item.value}
                  </span>
                </div>
              </div>
            )
          })

          hintJSX = (
            <div className='ui list'>
              {targetListJSX}
            </div>
          )

          return (
            <div className='item' key={index}>
              <div className='content'>
                <header className='header'>
                  {lawTitle}第 {key} 條
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

    let chooserJSX
    if (this.state.chooser) {
      chooserJSX = <LawChooser
        currentLaw={lawID}
        laws={laws}
        _toggleChooser={this._toggleChooser}
      />
    }

    return (
      <section className='ResultView'>
        {chooserJSX}
        <h4 className='ui dividing header'>
          <span style={{cursor: "pointer", float: "right", margin: '-0.5em', padding: '0.5em', opacity: (this.state.chooser ? "1" : "0.5")}}
            onClick={this._toggleChooser}>
            <i className='setting icon' style={{margin: 0}} />
          </span>
          <span style={{cursor: "pointer"}}
            data-filter='all'
            onClick={this._filter}
          >
            掃描結果（{lawID}，共 {count.all} 條規則）
          </span>
        </h4>
        <div className='ui secondary four item menu' style={{marginTop: "-1rem"}}>
          <a className={'item' + (this.state.filter === 'passed' ? ' active' : '')}
            data-filter='passed'
            onClick={this._filter}
          >
            通過
            <span className='ui green mini label'
              data-filter='passed'
            >
              {count.passed}
            </span>
          </a>
          <a className={'item' + (this.state.filter === 'failed' ? ' active' : '')}
            data-filter='failed'
            onClick={this._filter}
          >
            不通過
            <span className='ui red mini label'
              data-filter='failed'
            >
              {count.failed}
            </span>
          </a>
          <a className={'item' + (this.state.filter === 'unknown' ? ' active' : '')}
            data-filter='unknown'
            onClick={this._filter}
          >
            未知
            <span className='ui yellow mini label'
              data-filter='unknown'
            >
              {count.unknown}
            </span>
          </a>
          <a className={'item' + (this.state.filter === 'NA' ? ' active' : '')}
            data-filter='NA'
            onClick={this._filter}
          >
            不適用
            <span className='ui mini label'
            data-filter='NA'
            >
              {count.NA}
            </span>
          </a>
        </div>
        <div className='ui divided relaxed list'>
          {resultJSX}
        </div>
      </section>
    )
  }
}

export default ResultView
