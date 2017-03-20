import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import QuizView from './QuizView';
import './Quiz.css';

class Quiz extends Component {

  render() {

    return (
      <section className="Quiz">
        <QuizView answer={this.props.answer} {...this.props.quiz} />
        <Link to={"/quiz/" + this.props.quiz.id + "/edit"} className="ui mini icon button" >
          <i className="icon pencil" />
        </Link>
      </section>
    );
  }

}

export default Quiz;
