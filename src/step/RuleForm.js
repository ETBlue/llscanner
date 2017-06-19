import React, { Component } from 'react'
import './RuleForm.css'

class RuleForm extends Component {
  render () {
    const optionJSX = this.props.quizIDs.map((quizID) => {
      return (
        <option key={quizID} value={quizID} />
      )
    })

    const conditions = ['equal_to', 'not_equal_to', 'belong_to', 'not_belong_to', 'greater_than', 'less_than']
    const conditionJSX = conditions.map((condition) => {
      return (
        <div key={condition} className='field'>
          <div className='ui radio checkbox'>
            <input
              type='radio'
              title='condition'
              data-conditionID={this.props.conditionID}
              id={this.props.number}
              name='condition'
              value={condition}
              checked={this.props.checkedItem === condition}
              onClick={this.props.onRadioSelect}
              onChange={this.props.onInputChange}
            />
            <label>
              {condition}
            </label>
          </div>
        </div>
      )
    })

    return (
      <div className='RuleForm'>
        <hr className='ui divider' />
        <header className='header'>
          <h5 className='ui header'>條件 {this.props.conditionID} 規則</h5>
          <a className='ui right top floated orange icon labeled mini button'
            title='condition'
            data-conditionID={this.props.conditionID}
            id={this.props.number}
            onClick={this.props.onRuleDelete}
          >
            <i className='icon trash' />
            刪除規則
          </a>
        </header>
        <div className={'field ' + (this.props.id ? '' : 'error')}>
          <label>標的 *</label>
          <input
            type='text'
            title='condition'
            data-conditionID={this.props.conditionID}
            id={this.props.number}
            name='id'
            value={this.props.id}
            onChange={this.props.onInputChange}
            placeholder='請輸入問題代號'
            autoFocus={!!(this.props.focus.manual && this.props.focus.id === this.props.number)}
            list='quizIDs'
          />
          <datalist id='quizIDs'>
            { optionJSX }
          </datalist>
        </div>
        <div className='grouped fields'>
          <label>判斷方式</label>
          {conditionJSX}
        </div>
        <div className='field'>
          <label>答案值</label>
          <input
            type='text'
            title='condition'
            data-conditionID={this.props.conditionID}
            id={this.props.number}
            name='answer'
            value={this.props.answer}
            onChange={this.props.onInputChange}
            placeholder='若有多個以 , 隔開'
          />
        </div>
      </div>
    )
  }
}

export default RuleForm
