import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

class QuizList extends Component {

  render () {
    let quizListJSX
    const quiz = this.props.quiz
    const step = this.props.step
    const authenticated = this.props.authenticated

    if (quiz) {
      quizListJSX = Object.keys(quiz).map((id) => {
        const item = quiz[id]

        return (
          <tr key={id}>
            <td className='top aligned'>
              <h4 className='ui header'>
                <Link to={'/quiz/' + id}>
                  <code className='code'>{item.id}</code>
                </Link>
              </h4>
            </td>
            <td className='top aligned'>
              <code className='code'>{item.type}</code>
            </td>
            <td className='top aligned'>
              {step ? step.indexOf(id) : null}
            </td>
          </tr>
        )
      })
    }

    return (
      <div className='QuizList ui basic segment'>
        <h2 className='ui header'>測驗題</h2>
        <table className='ui table'>
          <thead>
            <tr>
              <th>題目</th>
              <th className='two wide'>類型</th>
              <th className='two wide'>排序</th>
            </tr>
          </thead>
          <tbody>
            { quizListJSX }
          </tbody>
          {authenticated ?
          <tfoot>
            <tr>
              <th colSpan={3} className='right aligned'>
                <div className='ui mini buttons'>
                  {/*<Link to='/quiz/new/' className='ui icon labeled green button' >
                                      <i className='icon add' />
                                      新測驗題
                                    </Link>*/}
                  <Link to='/quiz/edit/' className='ui icon labeled button' >
                    <i className='icon pencil' />
                    編輯清單
                  </Link>
                </div>
              </th>
            </tr>
          </tfoot> : null
          }
        </table>
      </div>
    )
  }
}

export default QuizList
