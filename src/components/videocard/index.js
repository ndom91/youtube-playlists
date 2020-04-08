import React, { useState, useEffect, useRef } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fas, faTrash } from '@fortawesome/free-solid-svg-icons'
import flow from 'lodash/flow'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { createDragPreview } from 'react-dnd-text-dragpreview'
import * as S from './styled'

const dragPreviewStyle = {
  backgroundColor: 'rgb(68, 67, 67)',
  borderColor: '#F96816',
  color: 'white',
  fontSize: 15,
  paddingTop: 4,
  paddingRight: 7,
  paddingBottom: 6,
  paddingLeft: 7
}

const handleOnClick = (e) => {
  e.preventDefault()
}

const Videocard = (props) => {
  const [sDragPreview, setDragPreview] = useState({})
  const {
    id,
    onRemove,
    url,
    title,
    channel,
    thumbnail,
    isDragging,
    connectDragSource,
    connectDropTarget
  } = props

  useEffect(() => {
    library.add(fas, faTrash)
    config.autoA11y = true
    props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    })

    const dragPreview = createDragPreview('Moving Video', dragPreviewStyle)
    setDragPreview(dragPreview)
    props.connectDragPreview(dragPreview)
  }, [])

  const mounted = useRef()
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      const dragPreview = createDragPreview(
        `${title.slice(0, 25).concat('...')}`,
        dragPreviewStyle,
        sDragPreview
      )
      setDragPreview(dragPreview)
    }
  }, [setDragPreview])

  const deleteIcon = <FontAwesomeIcon icon={['fas', 'trash']} />

  return connectDragSource(
    connectDropTarget(
      <div style={{ display: 'inline-block' }}>
        <S.VideoCard
          id='videocard'
          className='videocard'
          style={{
            opacity: isDragging ? 0.3 : 1,
            cursor: 'move'
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
                src={thumbnail}
              />
              <S.CardInfos className='cardInfos'>
                <S.CardTitle className='title'>{title}</S.CardTitle>
                <S.CardChannel className='channel'>{channel}</S.CardChannel>
              </S.CardInfos>
            </a>
          </S.Article>
        </S.VideoCard>
      </div>
    )
  )
}

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index,
      listId: props.listId,
      card: props.card
    }
  }
}

const cardTarget = {
  hover(props, monitor) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    const sourceListId = monitor.getItem().listId

    if (dragIndex === hoverIndex) {
      return
    }

    if (props.listId === sourceListId) {
      props.moveCard(dragIndex, hoverIndex)
      monitor.getItem().index = hoverIndex
    }
  }
}

export default flow(
  DropTarget('VIDEOCARD', cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource('VIDEOCARD', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))
)(Videocard)
