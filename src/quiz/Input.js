import React, { Component } from 'react';

class Edit extends Component {

  render() {
    return (
      <div className="field">
        <label>{this.props.label}</label>
        <input disabled={this.props.disabled} data-number={this.props.number} type="text" title={this.props.title} id={this.props.id} name={this.props.name} onChange={this.props.onChange} placeholder={this.props.placeholder} value={this.props.default} />
      </div>
    );

  }

}

export default Edit;
