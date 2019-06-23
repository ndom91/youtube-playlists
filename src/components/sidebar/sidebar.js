import React from 'react'
import './sidebar.css'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)

  }

  clearVideos = (v) => {

    const { videos } = this.props
    console.log(videos)
  }


  render() {
    return (
      <div className="item sidebar">

        <ul className="ks-cboxtags">
            <li>
              <input type="checkbox" id="checkboxOne" onChange={this.props.handleFullscreen} value="Fullscreen" />
              <label htmlFor="checkboxOne">Fullscreen</label>
            </li>
            <li>
              <input type="checkbox" id="checkboxTwo" onChange={this.props.handleAutoplay}  value="Auto-Play" />
              <label htmlFor="checkboxTwo">Auto-Play</label>
            </li>
        </ul>

        <div className="btn-wrapper">
          <button
            className="fancy-button pop-onhover bg-gradient1"
            onClick={this.props.onPlayClick}
            >
              <span>Play</span>
          </button>

          <button
            className="fancy-button pop-onhover bg-gradient3"
            onClick={this.clearVideos}
            >
              <span>Clear</span>
          </button>
        </div>
      </div>
    )
  }
}

export default Sidebar
