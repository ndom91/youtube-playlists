import React from 'react'
import './sidebar.min.css'

const Sidebar = props => {
  const { handleFullscreen, handleAutoplay, onPlay, onClear } = props
  return (
    <div className="item sidebar">
      <div className="checkBoxWrapper">
        <ul className="ks-cboxtags">
          <li>
            <input
              type="checkbox"
              id="checkboxOne"
              onChange={handleFullscreen}
              value="Fullscreen"
            />
            <label htmlFor="checkboxOne">Fullscreen</label>
          </li>
          <li>
            <input
              defaultChecked
              type="checkbox"
              id="checkboxTwo"
              onChange={handleAutoplay}
              value="checked"
            />
            <label htmlFor="checkboxTwo">Autoplay</label>
          </li>
        </ul>
      </div>

      <div className="btn-wrapper">
        <button className="fancy-button btn-play" onClick={onPlay}>
          <span className="ripple">Play</span>
        </button>

        <button className="fancy-button btn-clear " onClick={onClear}>
          <span className="ripple">Clear</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
