import React, { Component } from 'react'
import firebase from 'firebase'
import {HashLink as Link} from 'react-router-hash-link'
import ReactSortable from 'react-sortablejs'

import _copyNested from '../_shared/_copyNested'

class StepListEdit extends Component {
  constructor (props) {
    super(props)

    // to be rendered
    this.state = {
      step: _copyNested(this.props.step),
      valid: true,
    }

    this._initialState = _copyNested(this.state)

    this._changeInput = this._changeInput.bind(this)
    this._changeStepOrder = this._changeStepOrder.bind(this)
    this._deleteStep = this._deleteStep.bind(this)
    this._addStep = this._addStep.bind(this)

    this._validate = this._validate.bind(this)
    this._validateAll = this._validateAll.bind(this)

    this._refresh = this._refresh.bind(this)
    this._save = this._save.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState((prevState, props) => {
      prevState.step = _copyNested(nextProps.step)
      prevState.valid = true
      this._initialState = _copyNested(prevState)
      return prevState
    })
  }

  _refresh () {
    this.setState((prevState, props) => {
      prevState = _copyNested(this._initialState)
      return prevState
    })
  }

  _save () {
    if (this.state.valid) {
      firebase.database().ref('step').set(this.state.step)
    }
  }

  _validate (quiz_id) {
    let valid = true
    if (quiz_id.length === 0) {
      valid = false
    }
    return valid
  }

  _validateAll (step) {
    let valid = true
    step.forEach((quiz_id) => {
      if (!this._validate(quiz_id)) {
        valid = false
      }
    })
    return valid
  }

  _deleteStep (event) {
    const id = event.target.getAttribute('data-id')
    this.setState((prevState, props) => {
      prevState.step.splice(parseInt(id, 10), 1)
      prevState.valid = this._validateAll(prevState.step)
      return prevState
    })
  }

  _addStep () {
    this.setState((prevState, props) => {
      prevState.step.push('')
      prevState.valid = this._validateAll(prevState.step)
      return prevState
    })
  }

  _changeInput (event) {

    const target = event.target
    const id = target.getAttribute('data-id')
    const value = target.value

    this.setState((prevState, props) => {
      prevState.step[parseInt(id, 10)] = value
      prevState.valid = this._validateAll(prevState.step)
      return prevState
    })
  }

  _changeStepOrder (order) {

    this.setState((prevState, props) => {
      const newStep = order.map((id) => {
        return prevState.step[id]
      })
      prevState.step = newStep

      return prevState
    })
  }

  render () {

    const step = this.state.step
    const valid = this.state.valid ? '' : 'disabled'

    const stepListJSX = step.map((item, id) => {

      return (
        <tr key={id} data-id={id} className='sortable-item' >
          <td className='top aligned'>
            <i className='sort icon sortable-handle' />
            {id}
          </td>
          <td className='top aligned'>
            <div className='ui fluid input'>
              <input
                type='text'
                data-id={id}
                value={item}
                placeholder={item}
                onChange={this._changeInput}
              />
            </div>
          </td>
          <td className='right aligned'>
            <a className='ui mini red icon button'
              data-id={id} onClick={this._deleteStep} 
            >
              <i data-id={id} className='icon trash' />
          </a>
          </td>
        </tr>
      )
    })

    return (
      <div className='StepListEdit ui basic segment'>
        <h2 className='ui header'>編輯故事線</h2>
        <table className='ui unstackable table'>
          <thead>
            <tr>
              <th className='two wide'>排序</th>
              <th className=''>測驗題</th>
              <th className='two wide' />
            </tr>
          </thead>
          <ReactSortable
            tag='tbody'
            options={{
              handle: '.sortable-handle',
              draggable: '.sortable-item',
              filter: ".sortable-ignored",
              ghostClass: "sortable-ghost",
              chosenClass: "sortable-chosen",
              dragClass: "sortable-drag",
            }}
            onChange={(order, sortable, evt) => {
              this._changeStepOrder(order);
            }}
          >
            {stepListJSX}
          </ReactSortable>
          <tfoot>
            <tr>
              <th colSpan={3} className='right aligned'>
                <div className='ui mini buttons'>
                  <Link to='/step/' onClick={this._save} className={'ui icon labeled teal button ' + valid} >
                    <i className='icon checkmark' />
                    儲存
                  </Link>
                  <Link to='/step/' className='ui icon labeled button' >
                    <i className='icon cancel' />
                    取消
                  </Link>
                  <a onClick={this._refresh} className='ui icon labeled yellow button' >
                    <i className='icon refresh' />
                    還原
                  </a>
                  <a onClick={this._addStep} className='ui icon labeled green button' >
                    <i className='icon add' />
                    新增
                  </a>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

export default StepListEdit
