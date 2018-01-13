import React, { Component } from 'react'

import _getLogic from '../_shared/_getLogic'
import _viewLogic from '../_shared/_viewLogic'

import './RuleForm.css'

class RuleForm extends Component {

  _viewPosition(position) {
    if (position === 'precondition') {
      return '啟動'
    }
    if (position === 'condition') {
      return '通過'
    }
  }
  render () {

    const ruleSetID = this.props.ruleSetID
    const position = this.props.position
    const ruleID = this.props.ruleID
    const logic = this.props.logic || ''
    const target = this.props.target || ''
    const value = this.props.value || ''
    const changeInput = this.props.changeInput
    const selectRadio = this.props.selectRadio
    const changeRadio = this.props.changeRadio
    const deleteRule = this.props.deleteRule
    const quizIDs = this.props.quizIDs

    const logics = _getLogic()
    const logicOptionJSX = logics.map((logicOption) => {
      return (
        <span key={logicOption} className='inline field'>
          <span className='ui radio checkbox'>
            <input
              type='radio'
              data-ruleSetID={ruleSetID}
              data-position={position}
              data-ruleID={ruleID}
              value={logicOption}
              checked={logicOption === logic}
              onClick={selectRadio}
              onChange={changeRadio}
            />
            <label>
              {_viewLogic(logicOption)}
            </label>
          </span>
        </span>
      )
    })

    const quizOptionJSX = quizIDs.map((quizID) => {
      return (
        <option key={quizID} value={quizID} />
      )
    })

    return (
      <div className='RuleForm'>
        <header className='_header'>
          <h5 className='ui header'>{this._viewPosition(position)}條件 {ruleID}</h5>
          <a className='ui _rightTopFloated orange icon labeled mini button'
            data-ruleSetID={ruleSetID}
            data-position={position}
            data-ruleID={ruleID}
            onClick={deleteRule}
          >
            <i className='icon trash' />
            刪除{this._viewPosition(position)}條件 {ruleID}
          </a>
        </header>
        <div className={'field ' + (target.length > 0 ? '' : 'error')}>
          <label>標的 *</label>
          <input
            type='text'
            data-ruleSetID={ruleSetID}
            data-position={position}
            data-ruleID={ruleID}
            data-fieldID='target'
            value={target}
            onChange={changeInput}
            placeholder='目標問題的代號'
            list='quizIDs'
          />
          <datalist id='quizIDs'>
            { quizOptionJSX }
          </datalist>
        </div>
        <div className='field'>
          <label>判斷方式</label>
          {logicOptionJSX}
        </div>
        <div className={'field ' + (value.length > 0 ? '' : 'error')}>
          <label>答案值</label>
          <input
            type='text'
            data-ruleSetID={ruleSetID}
            data-position={position}
            data-ruleID={ruleID}
            data-fieldID='value'
            value={value}
            onChange={changeInput}
            placeholder='若有多個以 , 隔開'
          />
        </div>
        <hr className='ui divider' />
      </div>
    )
  }
}

export default RuleForm
