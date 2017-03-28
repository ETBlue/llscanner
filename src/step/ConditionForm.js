import React, { Component } from 'react';
import './ConditionForm.css';

class ConditionForm extends Component {

  render() {
    return (
      <div className="ConditionForm" >
        <h4 className="ui header">編輯先決條件</h4>
        <a className="ui right top floated orange icon labeled mini button" 
          id={this.props.id}
          data-number={this.props.number}
          onClick={this.props.onDelete} 
          >
          <i className="icon trash" />
          刪除此條件
        </a>
        <div className="two fields">
          <div className={"field " + (this.props.id ? "" : "error")}>
            <label>標的 *</label>
            <input 
              type="text" 
              title="condition" 
              name="id" 
              id={this.props.id} 
              value={this.props.id} 
              onChange={this.props.onChange} 
              placeholder="請輸入問題代號" 
              autoFocus={this.props.focus} 
              data-number={this.props.number} 
            />
          </div>
          <div className="field">
            <label>設定值</label>
            <input 
              type="text" 
              title="condition" 
              name="value" 
              id={this.props.id} 
              value={this.props.value} 
              onChange={this.props.onChange} 
              placeholder="問題的答案值" 
            />
          </div>
        </div>
        <hr className="ui divider" />
      </div>
    );

  }

}

export default ConditionForm;
