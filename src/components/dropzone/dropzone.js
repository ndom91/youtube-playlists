import React from 'react'
import './dropzone.min.css'
import Droptarget from './droptarget'

const Dropzone = props => {
  let isTargetVisible = false
  const showDropTarget = ev => {
    ev.preventDefault()
    const el = document.getElementById('droptarget')
    el.style.visibility = 'visible'
    isTargetVisible = true
  }

  return (
    <div
      style={{
        backgroundColor: !isTargetVisible ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.3)'
      }}
      id='dropzone'
      className='fullDroptarget'
      onDragOver={showDropTarget}
    >
      <Droptarget addVideoOnDrop={props.addVideoOnDrop} />
    </div>
  )
}

export default Dropzone
