import React, { Component } from 'react';
import Input from './Input';
import './QuizForm.css';

class QuizForm extends Component {

  render() {
    return (
      <div className="QuizForm">
        <h4 className="ui header">{this.props.header}</h4>
        <Input label="標題" title="quiz" id={this.props.id} name="title" required={true} status={this.props.title ? "" : "error"} onChange={this.props.onChange} placeholder="要讀者回答的問題" default={this.props.title} />
        <Input label="描述" title="quiz" id={this.props.id} name="description" onChange={this.props.onChange} placeholder="問題的補充說明" default={this.props.description} />
        <Input label="目標代號" title="quiz" disabled={this.props.lockID} id={this.props.id} name="id" required={true} status={this.props.id ? "" : "error"} onChange={this.props.onChange} placeholder="本題的編號" default={this.props.id} />
      </div>
    );

  }

}

export default QuizForm;
