import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './StepList.css';

class StepList extends Component {

  constructor(props) {

    super(props);

    this.state = {
      step: this.props.step,
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      return {
        step: nextProps.step,
      };
    });
  }

  render() {

    let stepListJSX;
    const step = this.state.step;

    if (step) {
      stepListJSX = Object.keys(step).map( (id) => {

        const item = step[id];

        let condition;
        if (item.condition) {
          condition = Object.keys(item.condition).map((key) => {
            const target = Object.keys(item.condition[key]).map((target) => {
              const rule = item.condition[key][target];
              const answer = rule.answer.split(",").map((str, index, arr) => {
                return (
                  <span key={str}>
                  <code className="code">{str.trim()}</code>
                  {index < arr.length - 1 ? ", " : "" }
                  </span>
                );
              });
              return (
                <div key={target} className="item">
                  當
                  <code className="code">{rule.id}</code>
                  的答案
                  <code className="code">{rule.condition}</code>
                  這些值： {answer}
                </div>
              );
            });
            return (
              <div key={key} className="ui divided list">
              {target}
              </div>
            );
          });
        }

        let route;
        if (item.route) {
          const list = Object.keys(item.route).map((key) => {
            return (
              <div key={key} className="item">
                回答
                <code className="code">{key}</code>
                將導向
                <code className="code">{item.route[key]}</code>
              </div>
            );
          });
          route = (
            <div className="ui divided list">
              {list}
            </div>
          );
        }

        return (
          <tr key={id}>
            <td>
              <Link key={item.id} to={"/step/" + item.id}>{item.quiz}</Link>
            </td>
            <td>{item.id}</td>
            <td>{condition}</td>
            <td>{route}</td>
            <td className="right aligned">
            </td>
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
              <th>題目</th>
              <th>排序</th>
              <th>先決條件</th>
              <th>分岔</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          { stepListJSX }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={5} className="right aligned">
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
