import React from 'react'
import ReactDOM from 'react-dom'
import './index.min.css'
import Header from './components/header/header'
import Dropzone from './components/dropzone/dropzone'
import Sidebar from './components/sidebar/sidebar'
import Player from './components/player/player'
import Modal from './components/modal/modal'
import Playlist from './components/playlist/playlist'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import _ from 'lodash'
import { setCookie, getCookie } from './helper'

import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'
import * as Sentry from '@sentry/browser'
import ReactGA from 'react-ga'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// Google Analytics
ReactGA.initialize('UA-111339084-6')
ReactGA.pageview(window.location.pathname + window.location.search)

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

class Mainwrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeVideo: '',
      isClipboardModalVisible: false,
      videoDetailsList: [],
      skippedClipboardVideos: [],
      eventId: null,
      fetchInProgress: false,
      videoOpts: {
        fullscreen: 0,
        autoplay: 1
      }
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
    const el = document.getElementById('droptarget')
    el.style.visibility = 'visible'
  }

  onLoad = () => {
    navigator.permissions.query({
      name: 'clipboard-read'
    })
    if (!getCookie('showedInstructions')) {
      setCookie('showedInstructions', 1, 365)
      toast('Drag a YouTube video onto the page to get started!', {
        className: 'info-toast',
        position: toast.POSITION.BOTTOM_LEFT,
        progress: 0,
        onOpen: () => {
          setTimeout(toast.dismiss, 5000)
        }
      })
    }
  }

  updateVideoDetailsList = videoUrl => {
    if (videoUrl) {
      const videoId = videoUrl
        .substring(videoUrl.indexOf('v=') + 2, videoUrl.length)
        .substring(0, 11)
      this.setState({ fetchInProgress: true })
      if (!this.state.videoDetailsList.some(e => e.id === videoId)) {
        const videoDetails = this.getVideoDetails(videoId)
        videoDetails.then(details => {
          this.setState({
            videoDetailsList: [...this.state.videoDetailsList, details],
            fetchInProgress: false
          })
        })
      }
    }
  }

  onVideoEnd = () => {
    const { videoOpts } = this.state

    if (videoOpts.autoplay === 1) {
      const videoDetailsRemaining = this.state.videoDetailsList.filter(
        video => video.id !== this.state.activeVideo
      )
      this.setState({ videoDetailsList: videoDetailsRemaining })
      this.startNextVideo()
    }
  }

  startNextVideo = () => {
    const videos = this.state.videoDetailsList
    if (videos.length !== 0) {
      const videoId = videos[0].id
      this.setState({ activeVideo: videoId })
      const videoIdsRemaining = videos.filter(video => video.id !== videoId)
      this.setState({ videoDetailsList: videoIdsRemaining })
    } else {
      toast('No Videos Available', {
        className: 'info-toast'
      })
    }
  }

  getVideoDetails = async id => {
    return fetch(`https://yt-details.ndo.workers.dev/?vid=${id}`, {
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
            if (!this.state.videoDetailsList.some(v => v.id === videoId) && !this.state.skippedClipboardVideos.includes(videoId)) {
              this.setState({ fetchInProgress: true })
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
                  clipboardLink: text,
                  fetchInProgress: false
                })
              })
            }
          }
        })
      }
    })
  }

  clearVideos = () => {
    this.setState({ videoIds: [], videoDetailsList: [] })
  }

  handleFullscreen = () => {
    const { videoOpts } = this.state
    if (videoOpts.fullscreen === 1) {
      this.setState({ videoOpts: { ...videoOpts, fullscreen: 0 } })
    } else {
      this.setState({ videoOpts: { ...videoOpts, fullscreen: 1 } })
    }
  }

  handleAutoplay = () => {
    const { videoOpts } = this.state
    if (videoOpts.autoplay === 1) {
      this.setState({ videoOpts: { ...videoOpts, autoplay: 0 } })
    } else {
      this.setState({ videoOpts: { ...videoOpts, autoplay: 1 } })
    }
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

  updateVideoListOrder = videoList => {
    console.log(videoList)
    this.setState({
      videoDetailsList: videoList
    })
  }

  render() {
    const {
      videoDetailsList,
      videoList,
      videoOpts,
      activeVideo,
      modalChildren,
      isClipboardModalVisible
    } = this.state

    const throttledFocus = _.debounce(this.handleFocus, 1000)

    const FetchSpinner = () => {
      if (this.state.fetchInProgress) {
        return (
          <div className="fetchSpinnerDiv">
            {/* <div className="loader"></div> */}
            <div class='cube-container'>
              <div id='cube'>
                <div class='front'></div>
                <div class='back'></div>
                <div class='right'></div>
                <div class='left'></div>
                <div class='top'></div>
                <div class='bottom'></div>
              </div>
              <div id='shadow'>"</div>
            </div>

          </div>
        )
      } else {
        return null
      }
    }

    return (
      <div
        onLoad={this.onLoad}
        onDragOver={this.makeVisible}
        onFocus={throttledFocus}
        className="container"
      >
        <FetchSpinner />
        <Dropzone addVideoOnDrop={this.updateVideoDetailsList} />
        <Header />
        <Sidebar
          handleFullscreen={this.handleFullscreen}
          handleAutoplay={this.handleAutoplay}
          onPlay={this.startNextVideo}
          onClear={this.clearVideos}
          videos={videoList}
          videoOpts={videoOpts}
        />
        <Player
          videoId={activeVideo}
          onEnd={this.onVideoEnd}
          videoOpts={videoOpts}
        />
        <div id="playlist" className="item footer playlist">
          <DndProvider backend={HTML5Backend}>
            <Playlist
              videoDetailsList={videoDetailsList}
              onRemove={this.removeVid}
              updateVideoListOrder={this.updateVideoListOrder}
            />
          </DndProvider>
        </div>
        <Modal
          show={isClipboardModalVisible}
          handleAdd={this.handleModalAdd}
          handleClose={this.handleModalClose}
        >
          {modalChildren}
        </Modal>
        <ToastContainer
          transition={Bounce}
          autoclose={1500}
          className="toast-container"
          closeOnClick
          pauseOnVisibilityChange={false}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          hideProgressBar={true}
          closeButton={false}
        />
      </div>
    )
  }
}

ReactDOM.render(<Mainwrapper />, document.getElementById('root'))
