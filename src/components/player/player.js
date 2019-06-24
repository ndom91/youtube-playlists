import React from 'react' 
import YouTube from 'react-youtube'
import './player.css'

class Player extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeVideo: ''
    }
  }

  _onReady = e => {
    console.log(e.target)
  }

  _makeFullscreen = e => {
    if(this.props.videoOpts.fullscreen === 1) {
      var playerElement = document.getElementById('widget2')
      var requestFullScreen = playerElement.requestFullScreen || playerElement.mozRequestFullScreen || playerElement.webkitRequestFullScreen;
      if (requestFullScreen) {
        requestFullScreen.bind(playerElement)();
      }
    }

  }

  render() { 
    const {
      videoId,
    } = this.props

    const opts = {
      height: '290',
      width: '540',
      playerVars: { 
        autoplay: 1,
      }
      // https://developers.google.com/youtube/player_parameters
    }

    return (
    <div 
      id="playerWrapper" 
      className="item player">
      <YouTube 
        videoId={videoId} 
        opts={opts}
        onReady={this._onReady} 
        onPlay={this._makeFullscreen}
        onEnd={this.props.onEnd} />
    </div>
    )
  }
}

export default Player