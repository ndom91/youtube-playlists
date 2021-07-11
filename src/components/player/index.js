import React, { useState, useEffect } from 'react'
import useStore from '../store'
import YouTube from 'react-youtube'

import * as S from './styled'

const Player = ({ videoId, onEnd }) => {
  const { fullscreen } = useStore(state => state.videoOpts)
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
    if (fullscreen === 1) {
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
    <S.Player id='playerWrapper' className='item player'>
      <YouTube
        videoId={videoId}
        opts={opts}
        onPlay={makeFullscreen}
        onEnd={onEnd}
      />
    </S.Player>
  )
}

export default Player
