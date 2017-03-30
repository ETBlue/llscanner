import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class StepView extends Component {

  constructor(props) {

    super(props);

    this.state = {
      stepData: this.props.stepData,
      quizData: this.props.quizData,
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {

      return {
        stepData: nextProps.stepData,
        quizData: nextProps.quizData,
      };
    });
  }

  render() {
    const step = this.state.stepData;
    const quiz = this.state.quizData;

    let conditionJSX;
    let routeJSX;

    if (step.condition) {
      conditionJSX = Object.keys(step.condition).map((key) => {

        const listJSX = Object.keys(step.condition[key]).map((id) => {
          const rule = step.condition[key][id];
          const answer = rule.answer.split(",").map((str, index, arr) => {

            return (
              <span key={str}>
              <code className="code">{str.trim()}</code>
              {index < arr.length - 1 ? ", " : "" }
              </span>
            );
          });

          return (
            <div key={id} className="ui vertical left aligned segment">
              <div className="ui list">
                <div className="item">
                  <i className="icon flag" />
                  <span className="content">
                  <code className="code">{rule.id}</code>
                  </span>
                </div>
                <div className="item">
                  <i className="icon setting" />
                  <span className="content">
                  <code className="code">{rule.condition}</code>
                  </span>
                </div>
                <div className="item">
                  <i className="icon tags" />
                  <span className="content">
                  {answer}
                  </span>
                </div>
              </div>
            </div>
          );
        });

        return (
          <div key={key}>
            <h5 className="ui vertical segment">
            <span className="ui label">{key}</span>
            </h5>
            {listJSX}
          </div>
        );

      });

    } else {
      conditionJSX = (
       <p>無</p>
      );
    }

    if (step.route) {
      const listJSX = Object.keys(step.route).map((key) => {
        return (
          <div key={key} className="item">
            <i className="icon random" />
            <span className="content">
              <code className="code">{step.route[key].id}</code>
              →
              <code className="code">{step.route[key].quiz}</code>
            </span>
          </div>
        );
      });
      routeJSX = (
        <div className="ui divided relaxed list">
          {listJSX}
        </div>
      );
    } else {
      routeJSX = (
       <p>無</p>
      );
    }

    return (
      <section className="StepView">
        <div className="Question ui basic segment">
          <h3 className="ui header">
            <span className="ui horizontal label">
            步驟 {step.id}
            </span>
            <code>
              {step.quiz}
            </code>
          </h3>
          <p>
            <Link to={"/quiz/" + step.quiz} >
            {quiz.title}
            </Link>
          </p>
          <hr className="ui hidden divider" />
          <div className="ui two column stackable grid">
            <div className="column">
              <h4 className="ui block header">進入條件</h4>
              {conditionJSX}
            </div>
            <div className="column">
              <h4 className="ui block header">離開路徑</h4>
              {routeJSX}
            </div>
          </div>
          <hr className="ui hidden divider" />
        </div>
      </section>
    );
  }

}

export default StepView;
