import React, { useEffect, useState } from 'react'
import './index.css'
import Header from './components/header'
import Dropzone from './components/dropzone'
import Sidebar from './components/sidebar'
import Player from './components/player'
import Modal from './components/modal'
import Playlist from './components/playlist'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import debounce from 'lodash.debounce'
import Joyride from 'react-joyride'
import Store from './components/store'
import * as S from './styled'

import ReactGA from 'react-ga'

// Google Analytics
ReactGA.initialize('UA-111339084-6')
ReactGA.pageview(window.location.pathname + window.location.search)

const App = () => {
  const [activeVideo, setActiveVideo] = useState('')
  const [modalChildren, setModalChildren] = useState(null)
  const [clipboardLink, setClipboardLink] = useState('')
  const [isClipboardModalVisible, setClipboardModalVisibility] = useState(false)
  const [skippedClipboardVideos, setSkippedClipboardVideos] = useState([])
  const [dropzoneVisible, setDropzoneVisibility] = useState(false)
  const [fetchInProgress, setFetchInProgress] = useState(false)
  const [joyrideRun, setJoyrideRun] = useState(false)
  const joyrideSteps = [
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
      content: 'Your videos will appear here. You can drag and drop to change the order.'
    },
    {
      target: '.item.sidebar',
      title: 'Controls',
      content: 'These are your controls, you can change options as well as start / clear the playlist.',
      placement: 'right'
    }
  ]
  const store = Store.useStore()

  const incrementJoyride = (state) => {
    if (state.type === 'tour:end' || state.type === 'tour:start') {
      const joyrideCount = window.localStorage.getItem('joyrideCount') || 0
      window.localStorage.setItem('joyrideCount', parseInt(joyrideCount) + 1)
    }
  }

  const updateVideosState = videoUrl => {
    if (videoUrl) {
      setFetchInProgress(true)
      let videoId
      if (videoUrl.includes('youtu.be')) {
        videoId = videoUrl
          .substring(videoUrl.indexOf('tu.be/') + 6)
      } else if (videoUrl.includes('youtube.com')) {
        videoId = videoUrl
          .substring(videoUrl.indexOf('v=') + 2, videoUrl.length)
          .substring(0, 11)
      }
      if (!store.get('videos').some(e => e.id === videoId)) {
        const videoDetails = fetchVideoDetails(videoId)
        videoDetails.then(details => {
          store.set('videos')([...store.get('videos'), details])
          setFetchInProgress(false)
        })
      }
    }
  }

  useEffect(() => {
    window.addEventListener('DOMContentLoaded', () => {
      const parsedUrl = new URL(window.location)
      const text = parsedUrl.searchParams.get('text')
      updateVideosState(text)
    })
    navigator.permissions.query({ name: 'clipboard-read' })
    const joyrideCount = window.localStorage.getItem('joyrideCount')
    if (joyrideCount < 2) {
      setJoyrideRun(true)
    }
  }, [])

  const handlePlayerEnd = () => {
    if (store.get('videoOpts').autoplay === 1) {
      const remainingVideos = store.get('videos').filter(
        video => video.id !== activeVideo
      )
      store.set('videos')(remainingVideos)
      handlePlay()
    }
  }

  const handlePlay = () => {
    if (store.get('videos').length !== 0) {
      const videoId = store.get('videos')[0].id
      setActiveVideo(videoId)
      const remainingVideos = store.get('videos').filter(
        video => video.id !== videoId
      )
      store.set('videos')(remainingVideos)
    } else {
      toast('No Videos Available', {
        className: 'info-toast'
      })
    }
  }

  const fetchVideoDetails = async id => {
    return window.fetch(`https://yt-details.ndo.workers.dev/?vid=${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      crossdomain: true
    })
      .then(resp => resp.json())
      .then(json => json)
  }

  const handleFocus = () => {
    navigator.permissions.query({ name: 'clipboard-read' }).then(result => {
      if (result.state === 'granted' || result.state === 'prompt') {
        navigator.clipboard.readText().then(text => {
          let videoId
          if (text.includes('youtube.com/watch')) {
            videoId = text
              .substring(text.indexOf('v=') + 2, text.length)
              .substring(0, 11)
            if (!store.get('videos').some(v => v.id === videoId) && !skippedClipboardVideos.includes(videoId)) {
              setFetchInProgress(true)
              const videoInfo = fetchVideoDetails(videoId)
              videoInfo.then(details => {
                const children = (
                  <div>
                    <S.ThumbFade className='thumb-fade' />
                    <S.ClipboardThumbnail
                      alt='video thumbnail'
                      className='clipboard-video-thumb'
                      src={details.thumb.medium.url}
                    />
                    <S.ModalText className='modal-header-text'>
                      We've detected a YouTube link in your clipboard
                    </S.ModalText>
                    <S.ModalText className='video-text'>{details.title}</S.ModalText>
                    <S.ModalText className='footer-text'>
                      Would you like to add it?
                    </S.ModalText>
                  </div>
                )
                setClipboardModalVisibility(true)
                setModalChildren(children)
                setClipboardLink(text)
                setFetchInProgress(false)
              })
            }
          }
        })
      }
    })
  }

  const onClipboardVideoAdd = () => {
    const videoId = clipboardLink
      .substring(clipboardLink.indexOf('v=') + 2, clipboardLink.length)
      .substring(0, 11)

    updateVideosState(clipboardLink)
    setClipboardModalVisibility(false)
    setSkippedClipboardVideos([...skippedClipboardVideos, videoId])
    setClipboardLink('')
  }

  const onModalClose = e => {
    e.preventDefault()
    const videoId = clipboardLink
      .substring(clipboardLink.indexOf('v=') + 2, clipboardLink.length)
      .substring(0, 11)

    setClipboardModalVisibility(false)
    setSkippedClipboardVideos([...skippedClipboardVideos, videoId])
    setClipboardLink('')
  }

  const throttledFocus = debounce(handleFocus, 1000)

  return (
    <div
      onDragOver={() => setDropzoneVisibility(true)}
      onFocus={throttledFocus}
      className='container'
    >
      {joyrideRun && (
        <Joyride
          steps={joyrideSteps}
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
          callback={incrementJoyride}
        />
      )}
      <Dropzone
        visible={dropzoneVisible}
        addVideoOnDrop={updateVideosState}
        closeDropzone={() => setDropzoneVisibility(false)}
      />
      <Header />
      <Sidebar
        onPlay={handlePlay}
        videoOpts={store.get('videoOpts')}
      />
      <Player
        videoId={activeVideo}
        onEnd={handlePlayerEnd}
        videoOpts={store.get('videoOpts')}
      />
      <Playlist
        fetchInProgress={fetchInProgress}
      />
      {isClipboardModalVisible && (
        <Modal
          show={isClipboardModalVisible}
          handleAdd={onClipboardVideoAdd}
          handleClose={onModalClose}
        >
          {modalChildren}
        </Modal>
      )}
      <ToastContainer
        transition={Bounce}
        autoclose={1500}
        className='toast-container'
        closeOnClick
        pauseOnVisibilityChange={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        hideProgressBar
        closeButton={false}
      />
    </div>
  )
}

export default App
