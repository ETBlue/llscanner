import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

class QuizList extends Component {

  render () {
    let quizListJSX
    const quiz = this.props.quiz

    if (quiz) {
      quizListJSX = Object.keys(quiz).map((id) => {
        const item = quiz[id]

        return (
          <tr key={id}>
            <td className='top aligned'>
              <h4 className='ui header'>
                <Link to={'/quiz/' + id}>{item.title}</Link>
              </h4>
            </td>
            <td className='top aligned'><code className='code'>{item.type}</code></td>
            <td className='top aligned'><code className='code'>{item.id}</code></td>
          </tr>
        )
      })
    }

    return (
      <div className='QuizList ui basic segment'>
        <h2 className='ui header'>測驗題列表</h2>
        <table className='ui table'>
          <thead>
            <tr>
              <th>題目</th>
              <th className='two wide'>類型</th>
              <th>代號</th>
            </tr>
          </thead>
          <tbody>
            { quizListJSX }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3} className='right aligned'>
                <div className='ui mini buttons'>
                  <Link to='/quiz/new' className='ui icon labeled green button' >
                    <i className='icon add' />
                    New Quiz
                  </Link>
                  <Link to='/quiz/edit' className='ui icon labeled button' >
                    <i className='icon pencil' />
                    Edit List
                  </Link>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

export default QuizList
