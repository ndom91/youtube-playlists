import React from 'react'
import ReactDOM from 'react-dom'
import './index.min.css'
import Header from './components/header/header'
import Droptarget from './components/droptarget/droptarget'
import Sidebar from './components/sidebar/sidebar'
import Player from './components/player/player'
import Videocard from './components/videocard/videocard'
import Modal from './components/modal/modal'
import Darkmode from 'darkmode-js'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import youtube from './components/apis/youtube'
import * as serviceWorker from './serviceWorker'

let videoOpts = {}

var darkmodeOptions = {
  bottom: '64px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '32px', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#9B89B3', // default: '#fff'
  backgroundColor: '#fff', // default: '#fff'
  buttonColorDark: '#100f2c', // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: false, // default: true,
  label: '🌓' // default: ''
}

const darkmode = new Darkmode(darkmodeOptions)
darkmode.showWidget()

class Mainwrapper extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeVideo: '',
      youtubeClipboard: false,
      videoDetailsList: [],
      videoIds: []
    }
  }

  makeVisible = e => {
    const el = document.getElementById('dropTarget')
    el.style.visibility = 'visible'
  }

  onLoad = e => {
    navigator.permissions.query({
      name: 'clipboard-read'
    })
  }

  handleDrop = (videoUrl) => {
    videoUrl = videoUrl[0]

    this.updateVideoDetailsList(videoUrl)
  }

  updateVideoDetailsList = (videoUrl) => {
    if (videoUrl) {
      const videoId = videoUrl.substring(videoUrl.indexOf('v=') + 2, videoUrl.length)

      if (!this.state.videoIds.includes(videoId)) {
        const videoDetailsPromise = this.getVideoDetails(videoId)
        const videoDetails = Promise.resolve(videoDetailsPromise)
        videoDetails.then(videoDetail => {
          this.setState({
            videoDetailsList: [...this.state.videoDetailsList, videoDetail],
            videoIds: [...this.state.videoIds, videoId]
          })
        })
      }
    }
  }

  onVideoEnd = e => {
    this.startNextVideo()
  }

  startNextVideo = e => {
    const videoIds = this.state.videoIds
    if (videoIds.length !== 0) {
      const videoId = videoIds[0]
      this.setState({ activeVideo: videoId })
      const videoIdsRemaining = this.state.videoIds.filter(video => video !== videoId)
      this.setState({ videoIds: videoIdsRemaining })
    } else {
      toast('No Videos available to play!', {
        className: 'info-toast',
        progressClassName: 'progress-toast'
      })
    }
  }

  // testing pre-commit hook
  // testing pre-commit hook

  getVideoDetails = async (id) => {
    const host = window.location.hostname
    const KEY = 'AIzaSyAcgdqeDAFIlGkeUtE7PUJqB5GWomKobBY'
    // const KEY = 'GOOGLE_API'
    const response = await youtube.get('/videos', {
      params: {
        id: id,
        part: 'snippet',
        key: KEY
      },
      headers: { 'Access-Control-Allow-Origin': host, 'Content-Type': 'application/json' },
      crossdomain: true
    })

    if (response.data.items[0]) {
      console.log(response.data)
      const videoDetails = response.data.items[0].snippet
      const channel = videoDetails.channelTitle
      const title = videoDetails.localized.title
      const thumbnail = videoDetails.thumbnails.medium.url

      return {
        id: id,
        url: 'https://youtube.com/watch?v=' + id,
        title: title,
        channel: channel,
        thumb: thumbnail
      }
    } else {
      toast.error('Video Info Loading Failed')
    }
  }

  removeVid = (videoId) => {
    const oldDetailArray = this.state.videoDetailsList.filter(video => video.id !== videoId)
    const oldVideoIds = this.state.videoIds.filter(video => video !== videoId)
    console.log(oldDetailArray, oldVideoIds)
    this.setState({ videoDetailsList: oldDetailArray, videoIds: oldVideoIds })
  }

  handleFocus = e => {
    navigator.clipboard.readText()
      .then(text => {
        const videoId = text.substring(text.indexOf('v=') + 2, text.length)
        if (text.includes('youtube') && !this.state.videoIds.includes(videoId)) {
          const videoInfoPromise = this.getVideoDetails(videoId)
          const videoInfo = Promise.resolve(videoInfoPromise)
          videoInfo.then(details => {
            console.log(details)
            const children = (
              <div>
                <div className='thumb-fade' />
                <img alt='video thumbnail' className='clipboard-video-thumb' src={details.thumb} />
                <div className='modal-text modal-header-text'>
                  We've detected a YouTube link in your clipboard
                </div>
                <div className='modal-text video-text'>
                  {/* {details.channel}
                  <br /> */}
                  {details.title}
                </div>
                <div className='modal-text footer-text'>
                  Would you like to add it?
                </div>
              </div>
            )
            this.setState({ youtubeClipboard: true, modalChildren: children, link: text })
          })
        }
      })
  }

  clearVideos = () => {
    this.setState({ videoIds: [], videoDetailsList: [] })
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
    // console.log(e)
  }

  handleModalAdd = () => {
    const {
      link
    } = this.state

    this.updateVideoDetailsList(link)
    this.setState({ youtubeClipboard: false, link: null })
  }

  handleModalClose = e => {
    e.preventDefault()
    this.setState({ youtubeClipboard: false })
  }

  renderVideoCards = () => {
    const {
      videoDetailsList
    } = this.state

    videoDetailsList && videoDetailsList.map((video) => {
      console.log('video', video)

      return (
        <Videocard
          key={video.id}
          id={video.id}
          url={video.url}
          title={video.title}
          channel={video.channel}
          thumbnail={video.thumb}
          onRemove={this.removeVid(video.id)}
        />
      )
    })
  }

  render () {
    const {
      videoDetailsList
    } = this.state

    const PlaylistJSX = (
      <span className='playlist-container'>
        {videoDetailsList &&
        videoDetailsList.map((video) => (
          <Videocard
            key={video.id}
            id={video.id}
            url={video.url}
            title={video.title}
            channel={video.channel}
            thumbnail={video.thumb}
            onRemove={this.removeVid}
          />
        ))}
      </span>
    )

    return (
      <div
        onLoad={this.onLoad}
        onDragOver={this.makeVisible}
        onFocus={this.handleFocus}
        className='container'>
        <Droptarget
          callbackFromParent={this.handleDrop} />
        <Header />
        <Sidebar
          handleFullscreen={this.handleFullscreen}
          handleAutoplay={this.handleAutoplay}
          onPlay={this.startNextVideo}
          onClear={this.clearVideos}
          onFocus={this.handleFocus}
          videos={this.state.videoList} />
        <Player
          videoId={this.state.activeVideo}
          onEnd={this.onVideoEnd}
          videoOpts={videoOpts} />
        <div
          id='playlist'
          className='item footer playlist' >
          {PlaylistJSX}
        </div>
        <Modal
          show={this.state.youtubeClipboard}
          handleAdd={this.handleModalAdd}
          handleClose={this.handleModalClose}
          children={this.state.modalChildren}
        />
        <ToastContainer
          transition={Bounce}
          autoclose={3000}
          className='toast-container'
          closeOnClick
          pauseOnVisibilityChange={false}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          closeButton={false}
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
