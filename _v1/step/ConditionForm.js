import React, { Component } from 'react'
import RuleForm from './RuleForm'
import './ConditionForm.css'

class ConditionForm extends Component {
  render () {
    const ruleJSX = !this.props.rules ? [] : this.props.rules.map((ruleContent, ruleID) => {
      return (
        <RuleForm
          key={ruleID}
          ruleID={ruleID}
          {...ruleContent}
          quizIDs={quizIDs}
          changeInput={this._changeInput}
          changeRadio={this._changeRadio}
          selectRadio={this._selectRadio}
          deleteRule={this._deleteRule}
        />
      )
    })

    return (
      <div className='ConditionForm' >
        <h4 className='ui header'>編輯進入條件 {this.props.id}</h4>
        <a className='ui right top floated red icon labeled mini button'
          title='condition'
          id={this.props.id}
          onClick={this.props.onConditionDelete}
        >
          <i className='icon trash' />
          刪除此條件
        </a>
        {ruleJSX}
        <hr className='ui divider' />
        <div className='action'>
          <a className='ui olive icon labeled mini button'
            title='condition'
            id={this.props.id}
            onClick={this.props.onRuleAdd}
          >
            <i className='icon add' />
            新增條件 {this.props.id} 的規則
          </a>
        </div>
        <hr className='ui divider' />
      </div>
    )
  }
}

export default ConditionForm
