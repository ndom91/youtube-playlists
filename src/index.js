import React from 'react'
import ReactDOM from 'react-dom'
import './index.min.css'
import Header from './components/header/header'
import Droptarget from './components/droptarget/droptarget'
import Sidebar from './components/sidebar/sidebar'
import Player from './components/player/player'
import Videocard from './components/videocard/videocard'
import Modal from './components/modal/modal'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import _ from 'lodash'

import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'
import * as Sentry from '@sentry/browser'

// Setup Logging + Error Tracking
Sentry.init({
  dsn: 'https://1dff941d871e43fca1a0f9e05651fc06@sentry.ndo.dev/2',
  release: 'youtube-playlist@1.3',
  autoBreadcrumbs: {
    console: false
  }
})

LogRocket.init('4ayekz/youtube-playlists')
setupLogRocketReact(LogRocket)

LogRocket.getSessionURL(sessionURL => {
  Sentry.configureScope(scope => {
    scope.setExtra('sessionURL', sessionURL)
  })
})

let videoOpts = {}

class Mainwrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeVideo: '',
      isClipboardModalVisible: false,
      videoDetailsList: [],
      videoIds: [],
      skippedClipboardVideos: [],
      eventId: null
    }
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo)
      const eventId = Sentry.captureException(error)
      this.setState({ eventId })
    })
  }

  makeVisible = () => {
    const el = document.getElementById('dropTarget')
    el.style.visibility = 'visible'
  }

  onLoad = () => {
    navigator.permissions.query({
      name: 'clipboard-read'
    })
  }

  updateVideoDetailsList = videoUrl => {
    if (videoUrl) {
      const videoId = videoUrl
        .substring(videoUrl.indexOf('v=') + 2, videoUrl.length)
        .substring(0, 11)

      if (!this.state.videoIds.includes(videoId)) {
        const videoDetails = this.getVideoDetails(videoId)
        videoDetails.then(details => {
          this.setState({
            videoDetailsList: [...this.state.videoDetailsList, details],
            videoIds: [...this.state.videoIds, videoId]
          })
        })
      }
    }
  }

  onVideoEnd = () => {
    this.startNextVideo()
  }

  startNextVideo = () => {
    const videoIds = this.state.videoIds
    if (videoIds.length !== 0) {
      const videoId = videoIds[0]
      this.setState({ activeVideo: videoId })
      const videoIdsRemaining = this.state.videoIds.filter(
        video => video !== videoId
      )
      this.setState({ videoIds: videoIdsRemaining })
    } else {
      toast('No Videos Available!', {
        className: 'info-toast',
        progressClassName: 'progress-toast'
      })
    }
  }

  getVideoDetails = async id => {
    return fetch(`https://yt-details.ndo.workers.dev/?vid=${id}`, {
      // method: 'GET',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      crossdomain: true
    })
      .then(resp => resp.json())
      .then(json => json)
  }

  removeVid = videoId => {
    this.setState({
      videoIds: this.state.videoIds.filter(video => video !== videoId),
      videoDetailsList: this.state.videoDetailsList.filter(
        video => video.id !== videoId
      )
    })
  }

  handleFocus = () => {
    navigator.permissions.query({ name: 'clipboard-read' }).then(result => {
      if (result.state === 'granted' || result.state === 'prompt') {
        navigator.clipboard.readText().then(text => {
          let videoId
          if (text.includes('youtube.com/watch')) {
            videoId = text
              .substring(text.indexOf('v=') + 2, text.length)
              .substring(0, 11)
          }
          if (
            text.includes('youtube.com/watch') &&
            !this.state.videoIds.includes(videoId) &&
            !this.state.skippedClipboardVideos.includes(videoId)
          ) {
            const videoInfo = this.getVideoDetails(videoId)
            videoInfo.then(details => {
              const children = (
                <div>
                  <div className="thumb-fade" />
                  <img
                    alt="video thumbnail"
                    className="clipboard-video-thumb"
                    src={details.thumb}
                  />
                  <div className="modal-text modal-header-text">
                    We've detected a YouTube link in your clipboard
                  </div>
                  <div className="modal-text video-text">{details.title}</div>
                  <div className="modal-text footer-text">
                    Would you like to add it?
                  </div>
                </div>
              )
              this.setState({
                isClipboardModalVisible: true,
                modalChildren: children,
                clipboardLink: text
              })
            })
          }
        })
      }
    })
  }

  clearVideos = () => {
    this.setState({ videoIds: [], videoDetailsList: [] })
  }

  handleFullscreen = () => {
    if (videoOpts.fullscreen === 1) {
      videoOpts = { ...videoOpts, fullscreen: 0 }
    } else {
      videoOpts = { ...videoOpts, fullscreen: 1 }
    }
  }

  handleAutoplay = () => {
    // console.log(e)
  }

  handleModalAdd = () => {
    const { clipboardLink } = this.state

    const videoId = clipboardLink
      .substring(clipboardLink.indexOf('v=') + 2, clipboardLink.length)
      .substring(0, 11)

    this.updateVideoDetailsList(clipboardLink)
    this.setState({
      isClipboardModalVisible: false,
      skippedClipboardVideos: [...this.state.skippedClipboardVideos, videoId],
      clipboardLink: null
    })
  }

  handleModalClose = e => {
    const { clipboardLink } = this.state
    e.preventDefault()
    const videoId = clipboardLink
      .substring(clipboardLink.indexOf('v=') + 2, clipboardLink.length)
      .substring(0, 11)
    this.setState({
      skippedClipboardVideos: [...this.state.skippedClipboardVideos, videoId],
      isClipboardModalVisible: false,
      clipboardLink: null
    })
  }

  render() {
    const { videoDetailsList } = this.state

    const throttledFocus = _.debounce(this.handleFocus, 1000)

    const PlaylistJSX = (
      <span className="playlist-container">
        {videoDetailsList &&
          videoDetailsList.map(video => (
            <Videocard
              key={video.id}
              id={video.id}
              url={video.url}
              title={video.title}
              channel={video.channel}
              thumbnail={video.thumb}
              onRemove={() => this.removeVid(video.id)}
            />
          ))}
      </span>
    )

    return (
      <div
        onLoad={this.onLoad}
        onDragOver={this.makeVisible}
        onFocus={throttledFocus}
        className="container"
      >
        <Droptarget callbackFromParent={this.updateVideoDetailsList} />
        <Header />
        <Sidebar
          handleFullscreen={this.handleFullscreen}
          handleAutoplay={this.handleAutoplay}
          onPlay={this.startNextVideo}
          onClear={this.clearVideos}
          videos={this.state.videoList}
        />
        <Player
          videoId={this.state.activeVideo}
          onEnd={this.onVideoEnd}
          videoOpts={videoOpts}
        />
        <div id="playlist" className="item footer playlist">
          {PlaylistJSX}
        </div>
        <Modal
          show={this.state.isClipboardModalVisible}
          handleAdd={this.handleModalAdd}
          handleClose={this.handleModalClose}
        >
          {this.state.modalChildren}
        </Modal>
        <ToastContainer
          transition={Bounce}
          autoclose={3000}
          className="toast-container"
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

ReactDOM.render(<Mainwrapper />, document.getElementById('root'))
