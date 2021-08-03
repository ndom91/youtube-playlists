import React, { useRef } from 'react'
import { useDrag, useDrop, DragPreviewImage } from 'react-dnd'
import useStore from '@/lib/store'
import * as S from './styled'
import { removeVideoFromHash } from '../../utils'

const handleOnClick = (e) => {
  e.preventDefault()
}

const FetchSpinner = () => {
  return (
    <S.FetchLoader>
      <S.CubeContainer>
        <S.Cube>
          <div className="front" />
          <div className="back" />
          <div className="right" />
          <div className="left" />
          <div className="top" />
          <div className="bottom" />
        </S.Cube>
        <S.Shadow>,</S.Shadow>
      </S.CubeContainer>
    </S.FetchLoader>
  )
}

const type = 'VideoCard'

const Videocard = ({
  id,
  url,
  title,
  channel,
  thumbnail,
  index,
  fetchInProgress,
  moveCard,
}) => {
  const ref = useRef(null)
  const videos = useStore((state) => state.videos)

  const [, drop] = useDrop({
    type: type,
    accept: type,
    hover(item) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type, id, index },
    type: type,
    accept: type,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const handleVideoRemove = (event, videoId) => {
    removeVideoFromHash(videoId)
    useStore.setState(
      (state) => (state.videos = videos.filter((video) => video.id !== videoId))
    )
    event.stopPropagation()
  }

  const opacity = isDragging ? 0.5 : 1

  return (
    <div ref={ref} style={{ display: 'inline-block', opacity }}>
      <DragPreviewImage connect={preview} src={thumbnail.default.url} />
      {fetchInProgress && index === videos.length ? (
        <FetchSpinner />
      ) : (
        <S.VideoCard
          id="videocard"
          className="videocard"
          style={{
            opacity,
          }}
          onClick={handleOnClick}
          key={id}
        >
          <S.CardBtn onClick={(e) => handleVideoRemove(e, id)}>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{ marginTop: '4px' }}
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </S.CardBtn>
          <S.Article>
            <a href={url}>
              <S.CardThumb
                className="cardThumbnail"
                alt="Video Thumbnail"
                src={thumbnail.medium.url}
              />
              <S.CardInfos className="cardInfos">
                <S.CardTitle className="title">{title}</S.CardTitle>
                <S.CardChannel className="channel">{channel}</S.CardChannel>
              </S.CardInfos>
            </a>
          </S.Article>
        </S.VideoCard>
      )}
    </div>
  )
}

export default Videocard
