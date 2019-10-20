import React from 'react'
import './sidebar.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'

const Sidebar = props => {
  const { handleFullscreen, handleAutoplay, onPlay, onClear } = props
  return (
    <div className='item sidebar'>
      <div className='checkBoxWrapper'>
        <ul className='video-options-btn'>
          <li>
            <input
              type='checkbox'
              id='checkboxOne'
              onChange={handleFullscreen}
              value='Fullscreen'
            />
            <FontAwesomeIcon style={props.videoOpts.fullscreen === 1 ? { opacity: '1' } : { opacity: '0' }} className='sidebar-fa-icon' width='1.325em' icon={faCheckCircle} />
            <FontAwesomeIcon style={props.videoOpts.fullscreen === 1 ? { opacity: '0' } : { opacity: '1' }} className='sidebar-fa-icon' width='1.325em' icon={faTimesCircle} />
            <label htmlFor='checkboxOne'>Fullscreen</label>
          </li>
          <li>
            <input
              defaultChecked
              type='checkbox'
              id='checkboxTwo'
              onChange={handleAutoplay}
              value='checked'
            />
            <FontAwesomeIcon style={props.videoOpts.autoplay === 1 ? { opacity: '1' } : { opacity: '0' }} className='sidebar-fa-icon' width='1.325em' icon={faCheckCircle} />
            <FontAwesomeIcon style={props.videoOpts.autoplay === 1 ? { opacity: '0' } : { opacity: '1' }} className='sidebar-fa-icon' width='1.325em' icon={faTimesCircle} />
            <label htmlFor='checkboxTwo'>Autoplay</label>
          </li>
        </ul>
      </div>

      <div className='btn-wrapper'>
        <button className='fancy-button btn-play' onClick={onPlay}>
          <span className='ripple'>Play</span>
        </button>

        <button className='fancy-button btn-clear ' onClick={onClear}>
          <span className='ripple'>Clear</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
