import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import _fixYear from '../_fixYear.js';

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

        const lawData = this.state.law[law];

        // 法條名稱為 key，法條關連為 value（set）
        let dependency = new Map();
        lawData.law_data.forEach((article) => {
          if (article.relates) {
            Object.keys(article.relates).forEach((key) => {
              article.relates[key].forEach((item) => {
                let relation = dependency.get(item.law_name) || new Set();
                relation = relation.add(key);
                dependency.set(item.law_name, relation);
              });
            });
          }
        });
        // 法條依關係群組
        let relatedLaws = {
          ioLaws: [],
          sourceLaws: [],
          targetLaws: [],
        }
        dependency.forEach((relationSet, lawName) => {
          if ( relationSet.has("被引用條文") && relationSet.has("引用條文") ) {
            relatedLaws.ioLaws.push(lawName);
          } else if (relationSet.has("被引用條文")) {
            relatedLaws.targetLaws.push(lawName);
          } else if (relationSet.has("引用條文")) {
            relatedLaws.sourceLaws.push(lawName);
          }
        });
        const dependencyJSX = Object.keys(relatedLaws).map((relationType) => {
          if (relatedLaws[relationType].length > 0 ) {
            let icon;
            if (relationType === "ioLaws") {
              icon = "exchange";
            } else if (relationType === "sourceLaws") {
              icon = "arrow left";
            } else if (relationType === "targetLaws") {
              icon = "arrow right";
            }
            const relationTypeJSX = relatedLaws[relationType].map((lawName, index) => {
              return (
                <div key={index} className="item">
                  <i className={"icon " + icon} />
                  <div className="content">
                    <Link to={"/law/" + lawName}>
                    { lawName }
                    </Link>
                  </div>
                </div>
              );
            });
            return (
              <div key={relationType} className="ui vertical segment">
                <div className="ui relaxed list">
                { relationTypeJSX }
                </div>
              </div>
            );
          } else {
            return null;
          }
        });

        const versionJSX = lawData.versions ? lawData.versions.map((string, index) => {

          const map = {
            "制定": "birthday",
            "修正": "edit",
            "公布": "announcement",
          };
          let icon ="";
          Object.keys(map).forEach((change) => {
            icon = string.includes(change) ? map[change] : icon;
          });

          return (
            <div key={index} className="item">
              <i className={"icon " + icon} />
              <div className="content">
                {_fixYear(string)}
              </div>
            </div>
          );
        }) : "";

        return (
          <tr key={law}>
            <td className="top aligned">
              <h4 className="ui header">
                <Link to={"/law/" + lawData.title}>
                  {lawData.title}
                </Link>
              </h4>
            </td>
            <td className="top aligned">
              <div className="ui relaxed list">
              { versionJSX }
              </div>
            </td>
            <td className="top aligned">
              { dependencyJSX }
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
              <th className="four wide">法規名稱</th>
              <th className="six wide">版本</th>
              <th className="six wide">相依性</th>
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
