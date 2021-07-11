import React from 'react'
import useStore from '../store'
import * as S from './styled'

const Sidebar = ({ onPlay }) => {
  const { autoplay, fullscreen } = useStore(state => state.videoOpts)
  const clearVideos = useStore(state => state.clearVideos)

  const toggleFullscreen = () => {
    if (fullscreen) {
      useStore.setState({ videoOpts: { autoplay, fullscreen: false } })
    } else {
      useStore.setState({ videoOpts: { autoplay, fullscreen: true } })
    }
  }

  const toggleAutoplay = () => {
    if (autoplay) {
      useStore.setState({ videoOpts: { fullscreen, autoplay: false } })
    } else {
      useStore.setState({ videoOpts: { fullscreen, autoplay: true } })
    }
  }
  return (
    <div className='item sidebar'>
      <div className='checkBoxWrapper'>
        <S.VideoOptions>
          <S.VideoOptionsItem role='button' aria-pressed={fullscreen === 1}>
            <S.VideoOptionsInput
              type='checkbox'
              id='checkboxOne'
              onChange={toggleFullscreen}
              value='Fullscreen'
            />
            {fullscreen ? (
              <svg
                fill='currentColor'
                className='sidebar-fa-icon'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <svg
                fill='currentColor'
                className='sidebar-fa-icon'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                  clipRule='evenodd'
                />
              </svg>
            )}
            <S.VideoOptionsLabel htmlFor='checkboxOne'>
              Fullscreen
            </S.VideoOptionsLabel>
          </S.VideoOptionsItem>
          <S.VideoOptionsItem role='button' aria-pressed={autoplay === 1}>
            <S.VideoOptionsInput
              defaultChecked
              type='checkbox'
              id='checkboxTwo'
              onChange={toggleAutoplay}
              value='checked'
            />
            {autoplay ? (
              <svg
                fill='currentColor'
                className='sidebar-fa-icon'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <svg
                fill='currentColor'
                className='sidebar-fa-icon'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                  clipRule='evenodd'
                />
              </svg>
            )}
            <S.VideoOptionsLabel htmlFor='checkboxTwo'>
              Autoplay
            </S.VideoOptionsLabel>
          </S.VideoOptionsItem>
        </S.VideoOptions>
      </div>

      <S.BtnWrapper>
        <S.Button className='fancy-button btn-play' onClick={onPlay}>
          <span className='ripple'>Play</span>
        </S.Button>

        <S.Button className='fancy-button btn-clear ' onClick={clearVideos}>
          <span className='ripple'>Clear</span>
        </S.Button>
      </S.BtnWrapper>
    </div>
  )
}

export default Sidebar
