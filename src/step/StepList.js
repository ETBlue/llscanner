import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './StepList.css';

class StepList extends Component {

  constructor(props) {

    super(props);

    this.state = {
      step: this.props.step,
      quiz: this.props.quiz
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      return {
        step: nextProps.step,
        quiz: nextProps.quiz,
      };
    });
  }

  render() {

    let stepListJSX;
    const step = this.state.step;

    if (step) {
      stepListJSX = Object.keys(step).map( (id) => {

        const item = step[id];

        let conditionJSX;
        let routeJSX;

        if (item.condition) {
          conditionJSX = Object.keys(item.condition).map((key) => {

            const listJSX = Object.keys(item.condition[key]).map((id) => {
              const rule = item.condition[key][id];
              const answer = rule.answer.split(",").map((str, index, arr) => {

                return (
                  <span key={str}>
                  <code className="code">{str.trim()}</code>
                  {index < arr.length - 1 ? ", " : "" }
                  </span>
                );
              });

              return (
                <div key={id} className="ui vertical segment">
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
              <div key={key} className="Condition">
                <h5 className="ui dividing header">
                進入條件 {key}
                </h5>
                {listJSX}
              </div>
            );
          });
        }

        if (item.route) {
          const listJSX = Object.keys(item.route).map((key) => {
            return (
              <div key={key} className="item">
                <i className="icon random" />
                <span className="content">
                  <code className="code">{item.route[key].id}</code>
                  →
                  <code className="code">{item.route[key].quiz}</code>
                </span>
              </div>
            );
          });
          routeJSX = (
            <div>
              <h5 className="ui dividing header">
              離開路徑
              </h5>
              <div className="ui divided relaxed list">
                {listJSX}
              </div>
            </div>
          );
        }

        return (
          <tr key={id}>
            <td>
              <code className="code">
                <Link to={"/step/" + item.id}>{item.quiz}</Link>
              </code>
              <p className="comment">{this.state.quiz[item.quiz].title}</p>
            </td>
            <td>{item.id}</td>
            <td>{conditionJSX}{routeJSX}</td>
          </tr>
        )
      })
    }

    return (
      <div className="StepList ui basic segment">
        <h2 className="ui header">步驟列表</h2>
        <table className="ui unstackable table">
          <thead>
            <tr>
              <th className="five wide">題目</th>
              <th className="two wide">排序</th>
              <th className="nine wide">進出規則</th>
            </tr>
          </thead>
          <tbody>
          { stepListJSX }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3} className="right aligned">
                <div className="ui mini buttons">
                  <Link to="/step/new" className="ui icon labeled green button" >
                    <i className="icon add" />
                    New Step
                  </Link>
                  <Link to="/step/edit" className="ui icon labeled button" >
                    <i className="icon pencil" />
                    Edit List
                  </Link>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }

}

export default StepList;
