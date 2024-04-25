import React, { Component } from 'react'
import loadingGif from '../Growing_ring.gif'

export default class Loading extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <img src={loadingGif} alt="Loading.."></img>
      </div>
    )
  }
}
