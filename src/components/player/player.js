import React from 'react' 
import YouTube from 'react-youtube'
import './player.css'

// http://react-dnd.github.io/react-dnd/docs/api/drop-target

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
    // console.log(YouTube.PlayerState)
    // const el = document.getElementById('widget2')
    // el.focus()
    // var ev = new KeyboardEvent('keydown', {altKey:false,
    //   bubbles: true,
    //   cancelBubble: false, 
    //   cancelable: true,
    //   charCode: 0,
    //   code: "KeyF",
    //   composed: true,
    //   ctrlKey: false,
    //   currentTarget: null,
    //   defaultPrevented: false,
    //   detail: 0,
    //   eventPhase: 0,
    //   isComposing: false,
    //   isTrusted: true,
    //   key: "f",
    //   keyCode: 70,
    //   location: 0,
    //   metaKey: false,
    //   repeat: false,
    //   returnValue: false,
    //   target: document.getElementById('widget2'),
    //   shiftKey: false,
    //   type: "keydown",
    //   which: 70})

    // document.dispatchEvent(ev)

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