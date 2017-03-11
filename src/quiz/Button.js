import React, { Component } from 'react';

class Edit extends Component {

  render() {

    return (
      <a onClick={this.props.onClick} className={"Edit ui icon button "+ this.props.color + " " + this.props.className}>
        <i className={"icon " + this.props.icon} />
        {this.props.title}
      </a>
    );

  }

}

export default Edit;
