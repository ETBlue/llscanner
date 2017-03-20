import React, { Component } from 'react';

class Edit extends Component {

  render() {
    return (
      <div className={"field " + this.props.status}>
        <label>{this.props.label}{this.props.required? " *" : ""}</label>
        <input disabled={this.props.disabled} autoFocus={this.props.focus} data-number={this.props.number} type="text" title={this.props.title} id={this.props.id} name={this.props.name} onChange={this.props.onChange} placeholder={this.props.placeholder} value={this.props.default} />
      </div>
    );

  }

}

export default Edit;
