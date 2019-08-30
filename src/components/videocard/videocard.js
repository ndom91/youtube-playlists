import React from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faTrash } from '@fortawesome/free-solid-svg-icons'
import flow from 'lodash/flow'
import './videocard.min.css'

const handleOnClick = e => {
  e.preventDefault()
}

class Videocard extends React.Component {
  constructor(props) {
    super(props)
    library.add(fas, faTrash)
  }

  render() {
    const { id, onRemove, url, title, channel, thumbnail } = this.props

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

    const { isDragging, connectDragSource, connectDropTarget } = this.props

    return connectDragSource(
      connectDropTarget(
        <div
          id="videocard"
          className="videocard"
          style={{
            opacity: isDragging ? 0.5 : 1,
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
    )
  }
}

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index,
      listId: props.listId,
      card: props.card
    }
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()

    if (dropResult && dropResult.listId !== item.listId) {
      // props.onRemove(item.index)
    }
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    const sourceListId = monitor.getItem().listId

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2

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
    if (props.listId === sourceListId) {
      props.moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    }
  }
}

export default flow(
  DropTarget('VIDEOCARD', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource('VIDEOCARD', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Videocard)
