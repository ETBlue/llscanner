import React, { Component } from 'react';
import Input from './Input';
import './OptionForm.css';

class OptionForm extends Component {

  render() {

    return (
      <div className="OptionForm" >
        <h4 className="ui header">{this.props.header}</h4>
        <a className="ui right top floated orange icon mini button" onClick={this.props.onDelete} data-optionid={this.props.id} >
         <i className="icon trash" />
        </a>
        <Input label="排序" reference={this.props.reference} target={this.props.target} id={this.props.id} placeholder="請輸入數字，注意不可以跟其他選項重複喔" name="id" default={this.props.item.id} />
        <Input label="顯示文字" reference={this.props.reference} target={this.props.target} id={this.props.id} placeholder="請輸入字串" name="title" default={this.props.item.title} />
        <Input label="目標代號" reference={this.props.reference} target={this.props.target} id={this.props.id} placeholder="請輸入此選項設定的目標代號" name="target" default={this.props.item.target} />
        <Input label="設定值" reference={this.props.reference} target={this.props.target} id={this.props.id} placeholder="請輸入此選項代表的值" name="value" default={this.props.item.value} />
        <hr className="ui divider" />
      </div>
    );

  }

}

export default OptionForm;