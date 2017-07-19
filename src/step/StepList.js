import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

import _viewRoute from './_viewRoute'
import _viewPrecondition from './_viewPrecondition'

class StepList extends Component {

  render () {
    let stepListJSX
    const quiz = this.props.quiz
    const step = this.props.step
    const authenticated = this.props.authenticated

    if (step) {

      stepListJSX = step.map((item, id) => {

        return (
          <tr key={id}>
            <td className='top aligned'>
              <h4 className='ui header'>
                <Link to={'/step/' + item}>
                  <code className='code'>
                    {item}
                  </code>
                </Link>
              </h4>
            </td>
            <td className='top aligned'>
              {_viewPrecondition(quiz[item])}
            </td>
            <td className='top aligned'>
              {_viewRoute(quiz[item])}
            </td>
          </tr>
        )
      })
    }

    return (
      <div className='StepList ui basic segment'>
        <h2 className='ui header'>故事線</h2>
        <table className='ui table'>
          <thead>
            <tr>
              <th className='six wide'>題目</th>
              <th className='five wide'>進入條件</th>
              <th className='five wide'>離開路徑</th>
            </tr>
          </thead>
          <tbody>
            { stepListJSX }
          </tbody>
          {authenticated ?
          <tfoot>
            <tr>
              <th colSpan={3} className='right aligned'>
                <div className='ui mini buttons'>
                  <Link to='/step/edit/' className='ui icon labeled button' >
                    <i className='icon pencil' />
                    編輯清單
                  </Link>
                </div> 
              </th>
            </tr>
          </tfoot>
          : null
          }
        </table>
      </div>
    )
  }
}

export default StepList
