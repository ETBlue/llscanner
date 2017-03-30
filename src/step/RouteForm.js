import React, { Component } from 'react';
import './RouteForm.css';

class RouteForm extends Component {

  render() {

    const quizAnswerJSX = !this.props.quizAnswers ? "" : this.props.quizAnswers.map((answer) => {
      return (
        <option key={answer} value={answer} />
      );
    });

    const quizIDsJSX = this.props.quizIDs.map((quizID) => {
      return (
        <option key={quizID} value={quizID} />
      );
    });

    return (
      <div className="RouteForm" >
        <h4 className="ui header">編輯離開路徑</h4>
        <a className="ui right top floated red icon labeled mini button" 
          title="route" 
          id={this.props.number} 
          onClick={this.props.onRouteDelete} 
        >
          <i className="icon trash" />
          刪除此路徑
        </a>
        <div className={"field " + (this.props.id ? "" : "error")}>
          <label>答案值 *</label>
          <input 
            type="text" 
            title="route" 
            id={this.props.number} 
            name="id" 
            value={this.props.id} 
            onChange={this.props.onInputChange} 
            placeholder="請輸入答案值" 
            autoFocus={this.props.focus.manual && this.props.focus.id === this.props.number ? true : false} 
            list="quizAnswers" 
          />
          <datalist id="quizAnswers">
            { quizAnswerJSX }
          </datalist>
        </div>
        <div className="field">
          <label>題目代號</label>
          <input 
            type="text" 
            title="route" 
            id={this.props.number} 
            name="quiz" 
            value={this.props.quiz} 
            onChange={this.props.onInputChange} 
            placeholder="將前往的下一題代號" 
            list="quizIDs" 
          />
          <datalist id="quizIDs">
            { quizIDsJSX }
          </datalist>
        </div>
        <hr className="ui divider" />
      </div>
    );

  }

}

export default RouteForm;
