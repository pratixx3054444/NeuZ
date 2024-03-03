import React, { Component } from 'react'
import loader from './Flowing gradient.gif'
export default class Loader extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loader}/>
      </div>
    )
  }
}
