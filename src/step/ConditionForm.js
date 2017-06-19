import React, { Component } from 'react'
import RuleForm from './RuleForm'
import './ConditionForm.css'

class ConditionForm extends Component {
  render () {
    const ruleJSX = !this.props.rules ? '' : Object.keys(this.props.rules).map((id) => {
      return (
        <RuleForm
          key={id}
          number={id}
          focus={this.props.focus}
          conditionID={this.props.id}
          checkedItem={this.props.rules[id].condition}
          {...this.props.rules[id]}
          onRuleAdd={this.props.onRuleAdd}
          onRuleDelete={this.props.onRuleDelete}
          onInputChange={this.props.onInputChange}
          onRadioSelect={this.props.onRadioSelect}
          quizIDs={this.props.quizIDs}
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
