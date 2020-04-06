import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'

import * as S from './styled'

const Sidebar = props => {
  const { handleFullscreen, handleAutoplay, onPlay, onClear } = props
  return (
    <div className='item sidebar'>
      <div className='checkBoxWrapper'>
        <S.VideoOptions>
          <S.VideoOptionsItem>
            <S.VideoOptionsInput
              type='checkbox'
              id='checkboxOne'
              onChange={handleFullscreen}
              value='Fullscreen'
            />
            <FontAwesomeIcon style={props.videoOpts.fullscreen === 1 ? { opacity: '1' } : { opacity: '0' }} className='sidebar-fa-icon' width='1.325em' icon={faCheckCircle} />
            <FontAwesomeIcon style={props.videoOpts.fullscreen === 1 ? { opacity: '0' } : { opacity: '1' }} className='sidebar-fa-icon' width='1.325em' icon={faTimesCircle} />
            <S.VideoOptionsLabel htmlFor='checkboxOne'>Fullscreen</S.VideoOptionsLabel>
          </S.VideoOptionsItem>
          <S.VideoOptionsItem>
            <S.VideoOptionsInput
              defaultChecked
              type='checkbox'
              id='checkboxTwo'
              onChange={handleAutoplay}
              value='checked'
            />
            <FontAwesomeIcon style={props.videoOpts.autoplay === 1 ? { opacity: '1' } : { opacity: '0' }} className='sidebar-fa-icon' width='1.325em' icon={faCheckCircle} />
            <FontAwesomeIcon style={props.videoOpts.autoplay === 1 ? { opacity: '0' } : { opacity: '1' }} className='sidebar-fa-icon' width='1.325em' icon={faTimesCircle} />
            <S.VideoOptionsLabel htmlFor='checkboxTwo'>Autoplay</S.VideoOptionsLabel>
          </S.VideoOptionsItem>
        </S.VideoOptions>
      </div>

      <S.BtnWrapper>
        <S.Button className='fancy-button btn-play' onClick={onPlay}>
          <span className='ripple'>Play</span>
        </S.Button>

        <S.Button className='fancy-button btn-clear ' onClick={onClear}>
          <span className='ripple'>Clear</span>
        </S.Button>
      </S.BtnWrapper>
    </div>
  )
}

export default Sidebar
