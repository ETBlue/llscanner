import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

import _viewRoute from './_viewRoute'
import _viewPrecondition from './_viewPrecondition'

class StepList extends Component {

  render () {
    let stepListJSX
    const step = this.props.step

    if (step) {
      stepListJSX = Object.keys(step).map((id) => {

        const item = step[id]

        return (
          <tr key={id}>
            <td className='top aligned'>
              <h4 className='ui header'>
                <Link to={'/step/' + item.id}>
                  <code>
                    {item.quiz}
                  </code>
                </Link>
                <div className='sub header'>
                  {this.props.quiz[item.quiz].title}
                </div>
              </h4>
            </td>
            <td className='top aligned'>{item.id}</td>
            <td className='top aligned'>
              {_viewPrecondition(item.precondition)}
            </td>
            <td className='top aligned'>
              {_viewRoute(item.route)}
            </td>
          </tr>
        )
      })
    }

    return (
      <div className='StepList ui basic segment'>
        <h2 className='ui header'>步驟列表</h2>
        <table className='ui table'>
          <thead>
            <tr>
              <th className='four wide'>題目</th>
              <th className='two wide'>排序</th>
              <th className='five wide'>進入條件</th>
              <th className='five wide'>離開路徑</th>
            </tr>
          </thead>
          <tbody>
            { stepListJSX }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={4} className='right aligned'>
                <div className='ui mini buttons'>
                  <Link to='/step/new/' className='ui icon labeled green button' >
                    <i className='icon add' />
                    New Step
                  </Link>
                  <Link to='/step/edit/' className='ui icon labeled button' >
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

export default StepList
