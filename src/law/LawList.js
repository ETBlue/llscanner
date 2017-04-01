import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ArticleList extends Component {

  constructor(props) {

    super(props);

    this.state = {
      law: this.props.law,
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      prevState.law = nextProps.law;
      return prevState;
    });
  }

  render() {

    let lawListJSX;

    if (this.state.law) {
      lawListJSX = Object.keys(this.state.law).map( (law) => {

        return (
          <tr key={law}>
            <td className="top aligned">
              <h4 className="ui header">
                <Link to={"/law/" + this.state.law[law].title}>
                  {this.state.law[law].title}
                </Link>
              </h4>
            </td>
            <td className="top aligned">
              {this.state.law[law].versions ? this.state.law[law].versions.join("　") : ""}
            </td>
          </tr>
        );

      });
    }

    return (
      <div className="ArticleList ui basic segment">
        <h2 className="ui header">法規列表</h2>
        <table className="ui table">
          <thead>
            <tr>
              <th className="">法規名稱</th>
              <th className="">版本</th>
            </tr>
          </thead>
          <tbody>
          { lawListJSX }
          </tbody>
        {/*
          <tfoot>
            <tr>
              <th colSpan={3} className="right aligned">
                <div className="ui mini buttons">
                  <Link to="/law/new" className="ui icon labeled green button" >
                    <i className="icon add" />
                    New Article
                  </Link>
                  <Link to="/law/edit" className="ui icon labeled button" >
                    <i className="icon pencil" />
                    Edit List
                  </Link>
                </div>
              </th>
            </tr>
          </tfoot>
        */}
        </table>
      </div>
    );
  }

}

export default ArticleList;
