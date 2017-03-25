import React, { Component } from 'react';
import './QuizForm.css';

class QuizForm extends Component {

  render() {
    return (
      <div className="QuizForm">
        <h4 className="ui header">{this.props.header}</h4>
        <div className={"field " + (this.props.title ? "" : "error")}>
          <label>題目 *</label>
          <input 
            type="text" 
            title="quiz" 
            name="title" 
            id={this.props.id} 
            value={this.props.title} 
            onChange={this.props.onChange} 
            placeholder="要讀者回答的問題" 
            />
        </div>
        <div className="field">
          <label>描述</label>
          <input 
            type="text" 
            title="quiz" 
            name="description" 
            id={this.props.id} 
            value={this.props.description} 
            onChange={this.props.onChange} 
            placeholder="問題的補充說明" 
            />
        </div>
        <div className="two fields">
          <div className={"field " + (this.props.id ? "" : "error")}>
            <label>代號 *</label>
            <input 
              type="text" 
              title="quiz" 
              name="id" 
              id={this.props.id} 
              value={this.props.id} 
              onChange={this.props.onChange} 
              placeholder="本題的編號" 
              disabled={this.props.locked} 
              />
          </div>
          <div className="field">
            <label>順序</label>
            <input 
              type="text" 
              title="quiz" 
              name="order" 
              id={this.props.id} 
              value={this.props.order} 
              onChange={this.props.onChange} 
              placeholder="本題的出現順序" 
              disabled={this.props.locked} 
              />
          </div>
        </div>
      </div>
    );

  }

}

export default QuizForm;
