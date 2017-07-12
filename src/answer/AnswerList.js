import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

class AnswerList extends Component {

  render () {

    const answerData = this.props.answerData

    return (
      <div className='AnswerList ui basic segment'>
        <h2 className='ui header'>版本列表</h2>
        <table className='ui table'>
          <thead>
            <tr>
              <th className='four wide'>版本名稱</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to='/answer/testdata/' >
                測試用資料
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default AnswerList
