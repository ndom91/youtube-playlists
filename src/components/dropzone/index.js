import React from 'react'
import Droptarget from '../droptarget'
import * as S from './styled'

const Dropzone = props => {
  return (
    <S.DroptargetWrapper
      style={{
        backgroundColor: props.visible ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0)',
        visibility: props.visible ? 'visible' : 'hidden'
      }}
      id='dropzone'
      className='fullDroptarget'
    >
      <Droptarget visible={props.visible} closeDropzone={props.closeDropzone} addVideoOnDrop={props.addVideoOnDrop} />
    </S.DroptargetWrapper>
  )
}

export default Dropzone
