import { useState, useEffect } from 'react'
import useStore from '@/lib/store'
import YouTube from 'react-youtube'

const Player = ({ videoId, onEnd }) => {
  const { autoplay, fullscreen } = useStore((state) => state.videoOpts)

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setWidth(340)
    }
  }, [])

  // YouTube Settings: https://developers.google.com/youtube/player_parameters
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: autoplay ? 1 : 0,
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
    <div className="aspect-video w-full rounded-md bg-black p-4">
      <YouTube
        videoId={videoId}
        opts={opts}
        onPlay={makeFullscreen}
        onEnd={onEnd}
        className="aspect-video w-full rounded-md"
      />
    </div>
  )
}

export default Player
