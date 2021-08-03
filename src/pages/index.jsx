import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Modal from '@/components/modal'
import Playlist from '@/components/playlist'
import useStore from '@/lib/store'
import { fetchVideoDetails, parseYoutubeUrl, addVideoToHash } from '@/lib/utils'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import debounce from 'lodash.debounce'
import * as S from '@/lib/styled'

const Header = dynamic(() => import('@/components/header'), {
  ssr: false,
})
const Dropzone = dynamic(() => import('@/components/dropzone'), {
  ssr: false,
})
const Sidebar = dynamic(() => import('@/components/sidebar'), {
  ssr: false,
})
const Player = dynamic(() => import('@/components/player'), {
  ssr: false,
})

const App = () => {
  const [activeVideo, setActiveVideo] = useState('')
  const [modalChildren, setModalChildren] = useState(null)
  const [clipboardLink, setClipboardLink] = useState('')
  const [isClipboardModalVisible, setClipboardModalVisibility] = useState(false)
  const [skippedClipboardVideos, setSkippedClipboardVideos] = useState([])
  const [dropzoneVisible, setDropzoneVisibility] = useState(false)
  const [fetchInProgress, setFetchInProgress] = useState(false)

  const videos = useStore((state) => state.videos)
  const addVideo = useStore((state) => state.addVideo)
  const { autoplay } = useStore((state) => state.videoOpts)

  const parseVideo = (videoUrl) => {
    if (videoUrl) {
      setFetchInProgress(true)
      const videoId = parseYoutubeUrl(videoUrl)
      if (!videos.some((e) => e.id === videoId)) {
        const videoDetails = fetchVideoDetails(videoId)
        videoDetails.then((details) => {
          addVideo(details)
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
      parseVideo(text)
    })

    // parse URL hashes
    if (window.location.hash.length > 1) {
      const videoIdsFromUrl = JSON.parse(
        window.atob(decodeURIComponent(window.location.hash.slice(1)))
      )
      if (Array.isArray(videoIdsFromUrl)) {
        videoIdsFromUrl.forEach((videoId) => {
          parseVideo(videoId)
        })
      } else {
        parseVideo(videoIdsFromUrl)
      }
    }

    // get clipboard permissions
    navigator.permissions.query({ name: 'clipboard-read' })
  }, [])

  const handleVideoEnd = () => {
    if (autoplay) {
      useStore.setState(
        (state) =>
          (state.videos = videos.filter((video) => video.id !== activeVideo))
      )
      handlePlay()
    }
  }

  const handlePlay = () => {
    if (videos.length !== 0) {
      const videoId = videos[0].id
      setActiveVideo(videoId)
      useStore.setState(
        (state) =>
          (state.videos = videos.filter((video) => video.id !== videoId))
      )
    } else {
      toast('No Videos Available', {
        className: 'info-toast',
      })
    }
  }

  const handleFocus = (e) => {
    navigator.permissions.query({ name: 'clipboard-read' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        navigator.clipboard.readText().then((text) => {
          const videoId = parseYoutubeUrl(text)
          if (
            videoId !== undefined &&
            !videos.find((v) => v.id === videoId) &&
            !skippedClipboardVideos.includes(videoId) &&
            clipboardLink !== text
          ) {
            setFetchInProgress(true)
            const videoInfo = fetchVideoDetails(videoId)
            videoInfo.then((details) => {
              const children = (
                <div>
                  <S.ThumbFade className="thumb-fade" />
                  <S.ClipboardThumbnail
                    alt="video thumbnail"
                    className="clipboard-video-thumb"
                    src={details?.thumb.medium.url}
                  />
                  <S.ModalText className="modal-header-text">
                    We've detected a YouTube link in your clipboard
                  </S.ModalText>
                  <S.ModalText className="video-text">
                    {details?.title}
                  </S.ModalText>
                  <S.ModalText className="footer-text">
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

    parseVideo(clipboardLink)
    setClipboardModalVisibility(false)
    setSkippedClipboardVideos([...skippedClipboardVideos, videoId])
    setClipboardLink('')
  }

  const onModalClose = (e) => {
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
      className="container"
    >
      <Dropzone
        visible={dropzoneVisible}
        addVideoOnDrop={parseVideo}
        closeDropzone={() => setDropzoneVisibility(false)}
      />
      <Header />
      <Sidebar onPlay={handlePlay} />
      <Player videoId={activeVideo} onEnd={handleVideoEnd} />
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
        className="toast-container"
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
