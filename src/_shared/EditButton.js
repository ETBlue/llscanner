import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

class EditButton extends Component {

  render () {

    const link = this.props.link

    return (
      <div className='ui basic segment'>
        <Link to={link} className='ui mini icon button' >
          <i className='icon pencil' />
        </Link>
      </div>
    )

  }

}

export default EditButton
