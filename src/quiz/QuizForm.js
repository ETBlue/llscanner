import React, { Component } from 'react';
import Input from './Input';
import './QuizForm.css';

class QuizForm extends Component {

  render() {
    let inputJSX;
    if (this.props.lockID) {
      inputJSX = <Input label="ID" title="quiz" disabled id={this.props.id} name="id" required={true} status={this.props.id ? "" : "error"} onChange={this.props.onChange} placeholder="本題的編號" default={this.props.id} />;
    } else {
      inputJSX = <Input label="ID" title="quiz" id={this.props.id} name="id" required={true} status={this.props.id ? "" : "error"} onChange={this.props.onChange} placeholder="本題的編號" default={this.props.id} />;
    }
    return (
      <div className="QuizForm">
        <h4 className="ui header">{this.props.header}</h4>
        <Input label="標題" title="quiz" id={this.props.id} name="title" required={true} status={this.props.title ? "" : "error"} onChange={this.props.onChange} placeholder="要讀者回答的問題" default={this.props.title} />
        <Input label="描述" title="quiz" id={this.props.id} name="description" onChange={this.props.onChange} placeholder="問題的補充說明" default={this.props.description} />
        <div className="two fields">
          {inputJSX}
          <Input label="目標代號" title="quiz" id={this.props.id} name="target" onChange={this.props.onChange} placeholder="本題設定項目的代號" default={this.props.target} />
        </div>
      </div>
    );

  }

}

export default QuizForm;
