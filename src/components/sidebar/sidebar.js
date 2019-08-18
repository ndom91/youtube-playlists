import React from 'react'
import './sidebar.min.css'

class Sidebar extends React.Component {
  render() {
    return (
      <div className="item sidebar">
        <div className="checkBoxWrapper">
          <ul className="ks-cboxtags">
            <li>
              <input
                type="checkbox"
                id="checkboxOne"
                onChange={this.props.handleFullscreen}
                value="Fullscreen"
              />
              <label htmlFor="checkboxOne">Fullscreen</label>
            </li>
            <li>
              <input
                checked
                type="checkbox"
                id="checkboxTwo"
                onChange={this.props.handleAutoplay}
                value="Auto-Play"
              />
              <label htmlFor="checkboxTwo">Auto-Play</label>
            </li>
          </ul>
        </div>

        <div className="btn-wrapper">
          <button className="fancy-button btn-play" onClick={this.props.onPlay}>
            <span className="ripple">Play</span>
          </button>

          <button
            className="fancy-button btn-clear "
            onClick={this.props.onClear}
          >
            <span className="ripple">Clear</span>
          </button>
        </div>
      </div>
    )
  }
}

export default Sidebar
