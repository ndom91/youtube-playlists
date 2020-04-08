import React, { useEffect, useRef } from 'react'
import { useDrag, useDrop, DragPreviewImage, useDragLayer } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fas, faTrash } from '@fortawesome/free-solid-svg-icons'
import * as S from './styled'

const handleOnClick = (e) => {
  e.preventDefault()
}

const deleteIcon = <FontAwesomeIcon icon={['fas', 'trash']} />

const FetchSpinner = () => {
  return (
    <S.FetchLoader>
      <S.CubeContainer>
        <S.Cube>
          <div className='front' />
          <div className='back' />
          <div className='right' />
          <div className='left' />
          <div className='top' />
          <div className='bottom' />
        </S.Cube>
        <S.Shadow>,</S.Shadow>
      </S.CubeContainer>
    </S.FetchLoader>
  )
}

const type = 'VideoCard'

const Videocard = (props) => {
  const ref = useRef(null)
  const {
    id,
    onRemove,
    url,
    title,
    channel,
    thumbnail
  } = props

  useEffect(() => {
    library.add(fas, faTrash)
    config.autoA11y = true
  }, [])

  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = props.index
      if (dragIndex === hoverIndex) {
        return
      }
      props.moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type, id: props.id, index: props.index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  drag(drop(ref))

  const opacity = isDragging ? 0.5 : 1

  return (
    <div ref={ref} style={{ display: 'inline-block', opacity }}>
      <DragPreviewImage connect={preview} src={thumbnail.default.url} />
      {!props.fetchInProgress
        ? (
          <S.VideoCard
            id='videocard'
            className='videocard'
            style={{
              cursor: 'move',
              opacity
            }}
            onClick={handleOnClick}
            key={id}
          >
            <S.CardBtn onClick={onRemove}>
              {deleteIcon}
            </S.CardBtn>
            <S.Article>
              <a href={url}>
                <S.CardThumb
                  className='cardThumbnail'
                  alt='Video Thumbnail'
                  src={thumbnail.medium.url}
                />
                <S.CardInfos className='cardInfos'>
                  <S.CardTitle className='title'>{title}</S.CardTitle>
                  <S.CardChannel className='channel'>{channel}</S.CardChannel>
                </S.CardInfos>
              </a>
            </S.Article>
          </S.VideoCard>
        ) : (
          <FetchSpinner />
        )}
    </div>
  )
}

export default Videocard
