import React, { Component } from 'react';
import Button from './Button';
import './Action.css';

class Action extends Component {

  render() {

    const valid = this.props.valid ? "" : " disabled";

    return (
      <div className="Action">
        <div className={"ui mini buttons " + this.props.view}>
          <Button onClick={this.props.onToggle} icon="pencil" color="" />
        </div>
        <div className={"ui mini buttons " + this.props.edit}>
          <Button onClick={this.props.onSave} icon="checkmark" color="olive" className={"labeled" + valid} title="送出" />
          <Button onClick={this.props.onToggle} icon="cancel" color="" className="labeled" title="取消" />
          <Button onClick={this.props.onRefresh} icon="refresh" color="yellow" className="labeled" title="還原" />
          {/*<Button onClick={this._delete} icon="trash" color="orange" />*/}
        </div>
      </div>
    );
  }

}

export default Action;
