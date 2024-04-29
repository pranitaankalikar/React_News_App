import React from 'react'
import loadingGif from '../Growing_ring.gif'

export default function Loading() {
  return (
    <div className="d-flex justify-content-center">
      <img src={loadingGif} alt="Loading.."></img>
    </div>
  )
}
