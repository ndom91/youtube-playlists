import React from 'react'
import ReactDOM from 'react-dom'
import './index.min.css'
import Header from './components/header/header'
import Droptarget from './components/droptarget/droptarget'
import Playlist from './components/playlist/playlist'
import Sidebar from './components/sidebar/sidebar'
import Player from './components/player/player'
import Darkmode from 'darkmode-js'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import * as serviceWorker from './serviceWorker'

let videoOpts = {}

var darkmodeOptions = {
  bottom: '64px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '32px', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#eee', // default: '#fff'
  backgroundColor: '#fff', // default: '#fff'
  buttonColorDark: '#100f2c', // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: false, // default: true,
  label: '🌓' // default: ''
}

const darkmode = new Darkmode(darkmodeOptions)
darkmode.showWidget()

console.log(darkmode.isActivated())

class Mainwrapper extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      videoList: [],
      activeVideo: ''
    }
  }

  playlistFn = (dataFromChild) => {
    this.setState({
      videoList: dataFromChild
    })
  }

  makeVisible = e => {
    const el = document.getElementById('dropTarget')
    el.style.visibility = 'visible'
  }

  onVideoEnd = e => {
    this.startNextVideo()
  }

  startNextVideo = e => {
    console.log(e)
    const videoList = this.state.videoList
    if (videoList.length !== 0) {
      const videoUrl = videoList[0]
      const videoId = videoUrl.substring(videoUrl.indexOf('v=') + 2, videoUrl.length)
      this.setState({ activeVideo: videoId })
      // TODO - remove video also from playlist state
      const remainder = this.state.videoList.filter(video => video !== videoUrl)
      this.setState({ videoList: remainder })
    } else {
      toast.warn('No Videos Lined-up!')
    }
  }

  clearVideos = e => {
    this.setState({ videoList: [] })
  }

  handleFullscreen = e => {
    if (videoOpts.fullscreen === 1) {
      videoOpts = { ...videoOpts,
        fullscreen: 0
      }
    } else {
      videoOpts = { ...videoOpts,
        fullscreen: 1
      }
    }
  }

  handleAutoplay = e => {
    console.log(e)
  }

  render () {
    return (
        <div
          onDragOver={this.makeVisible}
          className='container'>
          <Droptarget
            callbackFromParent={this.playlistFn} />
          <Header />
          <Sidebar
            handleFullscreen={this.handleFullscreen}
            handleAutoplay={this.handleAutoplay}
            onPlay={this.startNextVideo}
            onClear={this.clearVideos}
            videos={this.state.videoList} />
          <Player
            videoId={this.state.activeVideo}
            onEnd={this.onVideoEnd}
            videoOpts={videoOpts} />
          <div
            id='playlist'
            className='item footer playlist' >
            <Playlist
              videoListP={this.state.videoList} />
          </div>
          <ToastContainer
            transition={ Bounce }
            className='toast-container'
            closeOnClick
            pauseOnVisibilityChange={ false }
          />
        </div>
    )
  }
}

ReactDOM.render(
  <Mainwrapper />,
  document.getElementById('root')
)

serviceWorker.unregister()
