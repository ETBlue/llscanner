import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

import ResultView from './ResultView'
import LawChooser from './LawChooser'

class AnswerView extends Component {

  render () {

    const status = this.props.status
    const answerData = this.props.answerData
    const laws = this.props.laws
    const lawID = this.props.lawID
    const quiz = this.props.quiz

    let answerDataJSX
    if (answerData) {
      answerDataJSX = Object.keys(answerData).map((key, index) => {

        const titleJSX = quiz[key] ? (
          <h4 className='ui header'>
            <Link to={`/quiz/${key}/`}>
              <code className='code'>
                {key}
              </code>
            </Link>
          </h4>
        ) : (
          <code className='code'>
            {key}
          </code>
        )

        return (
          <div key={key} className='item'>
            {titleJSX}
            <div className='right floated content'>
              {answerData[key]}
            </div>
          </div>
        )
      });
    }

    let rightColumnJSX

    if (status === 'view_result') {

      const rulesData = this.props.law[lawID]
      const lawObject = this.props.lawObject

      rightColumnJSX = <ResultView
        answerData={answerData}
        rulesData={rulesData}
        lawObject={lawObject}
        lawTitle={lawID}
        laws={laws}
        lawID={lawID}
      />

    }

    if (status === 'choose_law') {
      rightColumnJSX = <LawChooser currentLaw={lawID} laws={laws} />
    }

    return (
      <section className='AnswerView ui basic segment'>
        <h2 className='ui header'>
          我的答案
        </h2>
        <hr className='ui hidden divider' />
        <div className='ui two column stackable grid'>
          <div className='left aligned column'>
            <h4 className='ui dividing header'>測驗答案</h4>
            <div className='ui divided relaxed list'>
              {answerDataJSX}
            </div>
          </div>
          <div className='left aligned column'>
            {rightColumnJSX}
          </div>
        </div>
      </section>
    )
  }
}

export default AnswerView
