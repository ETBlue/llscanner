import React, { Component } from 'react';
import './Option.css';

class Option extends Component {

  render() {
    return (
      <button 
        className={"Option ui button " + this.props.className}
        data-value={this.props.value} 
        id={this.props.id} 
        onClick={this.props.onClick} 
      >
      {this.props.title}
      </button>
    );
  }

}

export default Option;
