import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Modal from '@/components/modal'
import Playlist from '@/components/playlist'
import useStore from '@/lib/store'
import { fetchVideoDetails, parseYoutubeUrl, addVideoToHash } from '@/lib/utils'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import debounce from 'lodash.debounce'

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
  const [clipboardModalVisible, setClipboardModalVisible] = useState(false)
  const [skippedClipboardVideos, setSkippedClipboardVideos] = useState([])
  const [dropzoneVisible, setDropzoneVisible] = useState(false)
  const [fetchInProgress, setFetchInProgress] = useState({
    state: false,
    id: '',
  })

  const videos = useStore((state) => state.videos)
  const addVideo = useStore((state) => state.addVideo)
  const { autoplay } = useStore((state) => state.videoOpts)

  const parseVideo = (videoUrl) => {
    if (videoUrl) {
      const videoId = parseYoutubeUrl(videoUrl)
      setFetchInProgress({ state: true, id: videoId })
      if (!videos.some((e) => e.id === videoId)) {
        const videoDetails = fetchVideoDetails(videoId)
        videoDetails.then((details) => {
          addVideo(details)
          addVideoToHash(videoId)
          setFetchInProgress({ state: false, id: '' })
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

  const handleFocus = () => {
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
            setFetchInProgress({ state: true, id: videoId })
            const videoInfo = fetchVideoDetails(videoId)
            videoInfo.then((details) => {
              const children = (
                <div className="z-30 flex items-start justify-between">
                  <img
                    alt="video thumbnail"
                    className="aspect-video rounded-md shadow-md"
                    src={details?.thumb.medium.url}
                  />
                  <div className="flex flex-grow flex-col items-start justify-between p-4 text-center">
                    <p className="w-full text-center font-semibold text-slate-800">
                      We've detected a link in your clipboard
                    </p>
                    <p className="my-2 w-full truncate text-center text-purple-600">
                      {details?.title}
                    </p>
                    <p className="mb-4 w-full text-center text-slate-800">
                      Would you like to add it?
                    </p>
                  </div>
                </div>
              )
              setClipboardModalVisible(true)
              setModalChildren(children)
              setClipboardLink(text)
              setFetchInProgress({ state: false, id: '' })
            })
          }
        })
      }
    })
  }

  const onClipboardVideoAdd = () => {
    const videoId = parseYoutubeUrl(clipboardLink)

    parseVideo(clipboardLink)
    setClipboardModalVisible(false)
    setSkippedClipboardVideos([...skippedClipboardVideos, videoId])
    setClipboardLink('')
  }

  const onModalClose = (e) => {
    e.preventDefault()
    const videoId = parseYoutubeUrl(clipboardLink)

    setClipboardModalVisible(false)
    setSkippedClipboardVideos([...skippedClipboardVideos, videoId])
    setClipboardLink('')
  }

  const throttledFocus = debounce(handleFocus, 1000)

  return (
    <div
      onDragOver={() => setDropzoneVisible(true)}
      onFocus={throttledFocus}
      className="flex w-full max-w-7xl flex-col space-y-2"
    >
      <Dropzone
        visible={dropzoneVisible}
        addVideoOnDrop={parseVideo}
        closeDropzone={() => setDropzoneVisible(false)}
      />
      <Header />
      <div className="flex space-x-2">
        <Sidebar onPlay={handlePlay} />
        <Player videoId={activeVideo} onEnd={handleVideoEnd} />
      </div>
      <Playlist fetchInProgress={fetchInProgress} />
      {clipboardModalVisible && (
        <Modal
          show={clipboardModalVisible}
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
