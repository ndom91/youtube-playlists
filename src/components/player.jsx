import { useState, useEffect } from 'react'
import useStore from '@/lib/store'
import YouTube from 'react-youtube'

const Player = ({ videoId, onEnd }) => {
  const { fullscreen } = useStore((state) => state.videoOpts)
  const [width, setWidth] = useState(540)

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setWidth(340)
    }
  }, [])

  // YouTube Settings: https://developers.google.com/youtube/player_parameters
  const opts = {
    height: '303',
    width: width,
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
    },
  }

  const makeFullscreen = () => {
    if (fullscreen) {
      const playerElement = document.getElementById('widget2')
      const requestFullScreen =
        playerElement.requestFullScreen ||
        playerElement.mozRequestFullScreen ||
        playerElement.webkitRequestFullScreen ||
        playerElement.msRequestFullScreen
      if (requestFullScreen) {
        requestFullScreen.bind(playerElement)()
      }
    }
  }

  return (
    <div id="playerWrapper" className="rounded-sm bg-black p-4">
      <YouTube
        videoId={videoId}
        opts={opts}
        onPlay={makeFullscreen}
        onEnd={onEnd}
      />
    </div>
  )
}

export default Player
