import React, { Component } from 'react';

class Edit extends Component {

  render() {

    return (
      <div className="field">
        <label>{this.props.label}</label>
        <input ref={(input) => this.props.reference(this.props.target, this.props.id, this.props.name, input)} placeholder={this.props.placeholder} name={this.props.name} type="text" defaultValue={this.props.default} />
      </div>
    );

  }

}

export default Edit;
