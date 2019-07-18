import React from 'react'
import './sidebar.min.css'

class Sidebar extends React.Component {
  render () {
    return (
      <div className='item sidebar'>

        <ul className='ks-cboxtags'>
          <li>
            <input type='checkbox' id='checkboxOne' onChange={this.props.handleFullscreen} value='Fullscreen' />
            <label htmlFor='checkboxOne'>Fullscreen</label>
          </li>
          <li>
            <input type='checkbox' id='checkboxTwo' onChange={this.props.handleAutoplay} value='Auto-Play' />
            <label htmlFor='checkboxTwo'>Auto-Play</label>
          </li>
        </ul>

        <div className='btn-wrapper'>
          <button
            className='fancy-button btn-play'
            onClick={this.props.onPlay}
          >
            <span>Play</span>
          </button>

          <button
            className='fancy-button btn-clear'
            onClick={nonExistentHandler}
            // onClick={this.props.onClearrrr}
          >
            <span>Clear</span>
          </button>
        </div>
      </div>
    )
  }
}

export default Sidebar
