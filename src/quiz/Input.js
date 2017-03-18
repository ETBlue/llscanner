import React, { Component } from 'react';

class Edit extends Component {

  render() {
    let inputJSX;
    if (this.props.disabled) {
      inputJSX = <input disabled data-number={this.props.number} type="text" title={this.props.title} id={this.props.id} name={this.props.name} onChange={this.props.onChange} placeholder={this.props.placeholder} value={this.props.default} />
    } else {
      inputJSX = <input data-number={this.props.number} type="text" title={this.props.title} id={this.props.id} name={this.props.name} onChange={this.props.onChange} placeholder={this.props.placeholder} value={this.props.default} />
    }
    return (
      <div className="field">
        <label>{this.props.label}</label>
        {inputJSX}
      </div>
    );

  }

}

export default Edit;
