import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faTrash } from '@fortawesome/free-solid-svg-icons'
import flow from 'lodash/flow'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { createDragPreview } from 'react-dnd-text-dragpreview'
import './videocard.min.css'

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

const handleOnClick = e => {
  e.preventDefault()
}

class Videocard extends React.Component {
  constructor(props) {
    super(props)
    library.add(fas, faTrash)
  }

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    })

    this.dragPreview = createDragPreview('Moving Video', dragPreviewStyle)
    this.props.connectDragPreview(this.dragPreview)
  }

  componentDidUpdate(prevProps) {
    this.dragPreview = createDragPreview(
      `${prevProps.title.slice(0, 25).concat('...')}`,
      dragPreviewStyle,
      this.dragPreview
    )
  }

  render() {
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
    } = this.props

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

    return connectDragSource(
      connectDropTarget(
        <div
          id="videocard"
          className="videocard"
          style={{
            opacity: isDragging ? 0.3 : 1,
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
  DropTarget('VIDEOCARD', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource('VIDEOCARD', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))
)(Videocard)
