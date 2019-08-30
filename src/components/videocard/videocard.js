import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faTrash } from '@fortawesome/free-solid-svg-icons'
import './videocard.min.css'

const handleOnClick = e => {
  e.preventDefault()
}

const Videocard = props => {
  const { id, index, onRemove, url, title, channel, thumbnail } = props

  library.add(fas, faTrash)

  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: 'VIDEOCARD',
    hover(video, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = video.index
      const hoverIndex = props.index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleX =
        (hoverBoundingRect.left - hoverBoundingRect.right) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientX = clientOffset.x - hoverBoundingRect.left
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return
      }
      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      video.index = hoverIndex
    }
  })
  // eslint-disable-next-line
  const [ {isDragging}, drag ] = useDrag({
    item: { type: 'VIDEOCARD', id, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  const cardThumbnail = {
    width: 'auto',
    height: '120px',
    marginLeft: '-30px',
    marginTop: '-5px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '3px'
  }

  const deleteIcon = <FontAwesomeIcon icon={['fas', 'trash']} />

  drag(drop(ref))
  return (
    <div
      id="videocard"
      className="videocard"
      ref={drag} // eslint-disable-line
      style={{
          opacity: isDragging ? 0.5 : 1, // eslint-disable-line
        cusor: 'move'
      }}
      onClick={handleOnClick}
      key={id}
    >
      <button onClick={onRemove} className="btn-floating">
        {deleteIcon}
      </button>
      <article className="card">
        <a href={url}>
          <img
            style={cardThumbnail}
            className="cardThumbnail"
            alt="Video Thumbnail"
            src={thumbnail}
          ></img>
          <div className="infos">
            <h2 className="title">{title}</h2>
            <h3 className="channel">{channel}</h3>
          </div>
        </a>
      </article>
    </div>
  )
}

export default Videocard
