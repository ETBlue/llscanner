import React, { Component } from 'react';
import Input from './Input';

class QuizForm extends Component {

  render() {
    return (
      <div className="QuizForm">
        <h4 className="ui header">{this.props.header}</h4>
        <Input label="標題" reference={this.props.reference} target={this.props.target} id="title" placeholder="要讀者回答的問題" name="title" default={this.props.data.title} />
        <Input label="描述" reference={this.props.reference} target={this.props.target} id="description" placeholder="問題的補充說明" name="description" default={this.props.data.description} />
        <div className="two fields">
          <Input label="ID" reference={this.props.reference} target={this.props.target} id="id" placeholder="本題的代號" name="id" default={this.props.data.id} />
          <Input label="目標代號" reference={this.props.reference} target={this.props.target} id="target" placeholder="本題設定項目的代號" name="target" default={this.props.data.target} />
        </div>
      </div>
    );
  }

}

export default QuizForm;
