import React, { useEffect, useState } from 'react'
import Header from './components/header'
import Dropzone from './components/dropzone'
import Sidebar from './components/sidebar'
import Player from './components/player'
import Modal from './components/modal'
import Playlist from './components/playlist'
import Store from './components/store'
import { fetchVideoDetails, parseYoutubeUrl, addVideoToHash } from './utils'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import debounce from 'lodash.debounce'
import Joyride from 'react-joyride'
import * as S from './styled'
import './index.css'

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
      placement: 'auto',
    },
    {
      target: '.footer.playlist',
      title: 'Playlist',
      content:
        'Your videos will appear here. You can drag and drop to change the order.',
    },
    {
      target: '.item.sidebar',
      title: 'Controls',
      content:
        'These are your controls, you can change options as well as start / clear the playlist.',
      placement: 'right',
    },
  ]
  const store = Store.useStore()

  const incrementJoyride = state => {
    if (state.type === 'tour:end' || state.type === 'tour:start') {
      const joyrideCount = window.localStorage.getItem('joyrideCount') || 0
      window.localStorage.setItem('joyrideCount', parseInt(joyrideCount) + 1)
    }
  }

  const addVideo = videoUrl => {
    if (videoUrl) {
      setFetchInProgress(true)
      const videoId = parseYoutubeUrl(videoUrl)
      if (!store.get('videos').some(e => e.id === videoId)) {
        const videoDetails = fetchVideoDetails(videoId)
        videoDetails.then(details => {
          const existingVideos = store.get('videos')
          // console.log(existingVideos)
          existingVideos.push(details)
          store.set('videos')(existingVideos)
          addVideoToHash(videoId)
          setFetchInProgress(false)
        })
      }
    }
  }

  useEffect(() => {
    // get web share target content and add to playlist
    window.addEventListener('DOMContentLoaded', () => {
      const parsedUrl = new URL(window.location)
      const text = parsedUrl.searchParams.get('text')
      addVideo(text)
    })

    // parse URL hashes
    if (window.location.hash.length > 1) {
      const videoIdsFromUrl = JSON.parse(
        window.atob(decodeURIComponent(window.location.hash.slice(1)))
      )
      if (Array.isArray(videoIdsFromUrl)) {
        videoIdsFromUrl.forEach(videoId => {
          setFetchInProgress(true)
          addVideo(videoId)
          setFetchInProgress(false)
        })
      } else {
        setFetchInProgress(true)
        addVideo(videoIdsFromUrl)
        setFetchInProgress(false)
      }
    }

    // get clipboard permissions
    navigator.permissions.query({ name: 'clipboard-read' })

    // check if tutorial has already been done
    const joyrideCount = window.localStorage.getItem('joyrideCount')
    if (joyrideCount < 2) {
      setJoyrideRun(true)
    } else {
      toast('Start by dragging a video onto the page!', {
        className: 'info-toast',
      })
    }

    // eslint-disable-next-line
  }, [])

  const handleVideoEnd = () => {
    if (store.get('videoOpts').autoplay === 1) {
      const remainingVideos = store
        .get('videos')
        .filter(video => video.id !== activeVideo)
      store.set('videos')(remainingVideos)
      handlePlay()
    }
  }

  const handlePlay = () => {
    if (store.get('videos').length !== 0) {
      const videoId = store.get('videos')[0].id
      setActiveVideo(videoId)
      const remainingVideos = store
        .get('videos')
        .filter(video => video.id !== videoId)
      store.set('videos')(remainingVideos)
    } else {
      toast('No Videos Available', {
        className: 'info-toast',
      })
    }
  }

  const handleFocus = e => {
    navigator.permissions.query({ name: 'clipboard-read' }).then(result => {
      if (result.state === 'granted' || result.state === 'prompt') {
        navigator.clipboard.readText().then(text => {
          const videoId = parseYoutubeUrl(text)
          if (
            videoId !== undefined &&
            !store.get('videos').find(v => v.id === videoId) &&
            !skippedClipboardVideos.includes(videoId) &&
            clipboardLink !== text
          ) {
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
                  <S.ModalText className='video-text'>
                    {details.title}
                  </S.ModalText>
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
        })
      }
    })
  }

  const onClipboardVideoAdd = () => {
    const videoId = parseYoutubeUrl(clipboardLink)

    addVideo(clipboardLink)
    setClipboardModalVisibility(false)
    setSkippedClipboardVideos([...skippedClipboardVideos, videoId])
    setClipboardLink('')
  }

  const onModalClose = e => {
    e.preventDefault()
    const videoId = parseYoutubeUrl(clipboardLink)

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
              primaryColor: '#ff4242',
            },
          }}
          callback={incrementJoyride}
        />
      )}
      <Dropzone
        visible={dropzoneVisible}
        addVideoOnDrop={addVideo}
        closeDropzone={() => setDropzoneVisibility(false)}
      />
      <Header />
      <Sidebar onPlay={handlePlay} videoOpts={store.get('videoOpts')} />
      <Player
        videoId={activeVideo}
        onEnd={handleVideoEnd}
        videoOpts={store.get('videoOpts')}
      />
      <Playlist fetchInProgress={fetchInProgress} />
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
