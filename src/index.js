import React from 'react'
import ReactDOM from 'react-dom'
import './index.min.css'
import Header from './components/header'
import Dropzone from './components/dropzone'
import Sidebar from './components/sidebar'
import Player from './components/player'
import Modal from './components/modal'
import Playlist from './components/playlist/playlist'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import _ from 'lodash'
import Joyride from 'react-joyride'

import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'
import * as Sentry from '@sentry/browser'
import ReactGA from 'react-ga'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import * as serviceWorker from './components/serviceWorker'

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

    window.addEventListener('DOMContentLoaded', () => {
      const parsedUrl = new URL(window.location);
      // searchParams.get() will properly handle decoding the values.
      const text = parsedUrl.searchParams.get('text'); // Android puts youtube URL here
      this.updateVideoDetailsList(text)
    });

    this.state = {
      activeVideo: '',
      isClipboardModalVisible: false,
      videoDetailsList: [],
      skippedClipboardVideos: [],
      dropzoneVisible: false,
      eventId: null,
      fetchInProgress: false,
      videoOpts: {
        fullscreen: 0,
        autoplay: 1
      },
      joyrideRun: false,
      steps: [
        {
          target: '.container',
          title: 'Drop Target',
          content: 'To begin, drag and drop a YouTube video onto this area.',
          placementBeacon: 'top',
          placement: 'auto'
        },
        {
          target: '.footer.playlist',
          title: 'Playlist',
          content: 'Your videos will appear here. You can drag and drop to change the order.',
        },
        {
          target: '.item.sidebar',
          title: 'Controls',
          content: 'These are your controls, you can change options as well as start / clear the playlist.',
          placement: 'right'
        }
      ]
    }
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo)
      const eventId = Sentry.captureException(error)
      this.setState({ eventId })
    })
  }

  componentDidMount() {
    const joyrideCount = window.localStorage.getItem('joyrideCount')
    if (joyrideCount < 2) {
      this.setState({
        joyrideRun: true
      })
    }
  }

  incrementJoyride = (state) => {
    if (state.type === 'tour:end' || state.type === 'tour:start') {
      const joyrideCount = window.localStorage.getItem('joyrideCount') || 0
      window.localStorage.setItem('joyrideCount', parseInt(joyrideCount) + 1)
    }
  }

  makeVisible = () => {
    // const el = document.getElementById('droptarget')
    // el.style.visibility = 'visible'
    this.setState({
      dropzoneVisible: true
    })
  }

  closeDropzone = () => {
    this.setState({
      dropzoneVisible: false
    })
  }

  onLoad = () => {
    navigator.permissions.query({
      name: 'clipboard-read'
    })
  }

  updateVideoDetailsList = videoUrl => {
    if (videoUrl) {
      this.setState({ fetchInProgress: true })
      let videoId
      if (videoUrl.includes('youtu.be')) {
        videoId = videoUrl
          .substring(videoUrl.indexOf('tu.be/') + 6)
      } else if (videoUrl.includes('youtube.com')) {
        videoId = videoUrl
          .substring(videoUrl.indexOf('v=') + 2, videoUrl.length)
          .substring(0, 11)
      }
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
      isClipboardModalVisible,
      fetchInProgress,
      steps,
      joyrideRun,
      dropzoneVisible
    } = this.state

    const throttledFocus = _.debounce(this.handleFocus, 1000)

    return (
      <div
        onLoad={this.onLoad}
        onDragOver={this.makeVisible}
        onFocus={throttledFocus}
        className="container"
      >
        <Joyride
          steps={steps}
          showSkipButton
          continuous
          showProgress
          run={joyrideRun}
          styles={{
            options: {
              zIndex: 1001,
              primaryColor: '#ff4242'
            }
          }}
          callback={this.incrementJoyride}
        />
        <Dropzone
          visible={dropzoneVisible}
          addVideoOnDrop={this.updateVideoDetailsList}
          closeDropzone={this.closeDropzone}
        />
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
              fetchInProgress={fetchInProgress}
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

serviceWorker.register()