import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ArticleList extends Component {

  constructor(props) {

    super(props);

    this.state = {
      lawData: this.props.lawData,
    };

    this._getArticleID = this._getArticleID.bind(this);
    this._parseText = this._parseText.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      prevState.lawData = nextProps.lawData;
      return prevState;
    });
  }

  _parseText(text) {

    const map = {
      "一": "1",
      "二": "2",
      "三": "3",
      "四": "4",
      "五": "5",
      "六": "6",
      "七": "7",
      "八": "8",
      "九": "9",
    }

    return text.split("").map((character, index) => {

      if (character === "十" ) {

        // 在頭尾的算 10
        if (text.length === 1) {
          return "10";

        // 在開頭的算 1
        } else if (index === 0 ) {
          return "1";

        // 在尾巴的算 0
        } else if ( index === text.length - 1 ) {
          return "0";

        // 夾在中間的省略
        } else {
          return "";
        }

      // 其他照翻
      } else {
        return map[character];
      }
    });
  }

  _getArticleID(text) {

    const number = text.replace("第","").replace("條","").replace(" ","").split("之").map((section, part) => {

      let subnumber = this._parseText(section).join("");

      // 如果原條號有「之」的話
      if (part === 1) {
        subnumber = "-" + subnumber;
      }
      return subnumber;
    });

    return number.join("");
  }

  render() {

    let articleListJSX;

    if (this.state.lawData && this.state.lawData.law_data) {
      articleListJSX = this.state.lawData.law_data.map( (article, index) => {

        if (article.rule_no) {

          const id = this._getArticleID(article.rule_no);
          let relatedJSX;

          if (article.relates) {
            relatedJSX = Object.keys(article.relates).map((relation) => {
              const relationJSX = article.relates[relation].map((law, order) => {
                const item = article.relates[relation][order];
                return item.numbers.map((number) => {
                  return (
                    <div key={number} className="item">
                      <i className={"icon arrow " + (relation === "被引用條文" ? "right" : "left") } />
                      <div className="content">
                        <Link to={"/law/" + item.law_name + "/" + this._getArticleID(number)} >
                          {`${item.law_name}　${number}`}
                        </Link>
                      </div>
                    </div>
                  );
                });
              });
              return (
                <div key={relation} className="ui vertical segment">
                  <div className="ui relaxed list">
                    {relationJSX}
                  </div>
                </div>
              );
            });
          }

          const preview = article.content.replace("　　","").split("\n");
          const paragraphJSX = preview.map((paragraph, part) => {
            return (
              <div key={part} className="item">
                {paragraph}
              </div>
            );
          });

          return (
            <tr key={article.rule_no}>
              <td className="top aligned">
                <h4 className="ui header">
                  <Link to={"/law/" + this.state.lawData.title + "/" + id}>
                    {article.rule_no.replace(" ","")}
                  </Link>
                  <div className="sub header">
                    {article.note.replace("(","").replace(")","")}
                  </div>
                </h4>
              </td>
              <td className="top aligned">
                <div className="ui divided relaxed list">
                  { paragraphJSX }
                </div>
              </td>
              <td className="top aligned">
                { relatedJSX }
              </td>
            </tr>
          );
        } else {
          return null;
        }
      });
    }

    return (
      <div className="ArticleList ui basic segment">
        <h2 className="ui header">
          {this.state.lawData.title}
          <div className="sub header">
            {this.state.lawData.versions.join("　")}
          </div>
        </h2>
        <table className="ui table">
          <thead>
            <tr>
              <th className="four wide">條號</th>
              <th className="six wide">預覽</th>
              <th className="six wide">關連</th>
            </tr>
          </thead>
          <tbody>
          { articleListJSX }
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
