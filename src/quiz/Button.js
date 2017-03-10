import React, { Component } from 'react';

class Edit extends Component {

  render() {

    return (
      <a onClick={this.props.onClick} className={"Edit ui icon button "+ this.props.color}>
        <i className={"icon " + this.props.icon} />
      </a>
    );

  }

}

export default Edit;
