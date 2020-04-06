import React from 'react'
import './dropzone.min.css'
import Droptarget from '../droptarget'

const Dropzone = props => {
  return (
    <div
      style={{
        backgroundColor: props.visible ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)',
        visibility: props.visible ? 'visible' : 'hidden'
      }}
      id='dropzone'
      className='fullDroptarget'
    >
      <Droptarget visible={props.visible} closeDropzone={props.closeDropzone} addVideoOnDrop={props.addVideoOnDrop} />
    </div>
  )
}

export default Dropzone
