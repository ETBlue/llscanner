import React, { Component } from 'react';
import Input from './Input';
import './OptionForm.css';

class OptionForm extends Component {

  render() {
    return (
      <div className="OptionForm" >
        <h4 className="ui header">{this.props.header}</h4>
        <a className="ui right top floated orange icon labeled mini button" onClick={this.props.onDelete} id={this.props.id} >
         <i className="icon trash" />
         刪除此選項
        </a>
        <Input label="顯示文字" title="option" id={this.props.id} name="title" required={true} status={this.props.title ? "" : "error"} onChange={this.props.onChange} placeholder="請輸入字串" default={this.props.title} />
        <div className="two fields">
          <Input label="排序" title="option" number={this.props.number} id={this.props.id} name="id" required={true} focus={this.props.focus} status={this.props.id ? "" : "error"} onChange={this.props.onChange} placeholder="請輸入數字，注意不可以跟其他選項重複喔" default={this.props.id} />
          <Input label="設定值" title="option" id={this.props.id} name="value" onChange={this.props.onChange} placeholder="請輸入此選項代表的值" default={this.props.value} />
        </div>
        <hr className="ui divider" />
      </div>
    );

  }

}

export default OptionForm;
