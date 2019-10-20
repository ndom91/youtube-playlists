import React from 'react'
import update from 'immutability-helper'
import Videocard from '../videocard/videocard'
import { DropTarget } from 'react-dnd'

class Playlist extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      videos: []
    }
  }

  UNSAFE_componentWillUpdate (nextProps) {
    if (
      nextProps.videoDetailsList &&
      nextProps.videoDetailsList.length !== this.state.videos.length
    ) {
      this.setState({ videos: nextProps.videoDetailsList })
    }
  }

  pushCard (card) {
    this.setState(
      update(this.state, {
        videos: {
          $push: [card]
        }
      })
    )
  }

  moveCard (dragIndex, hoverIndex) {
    const { videos } = this.state
    const dragCard = videos[dragIndex]

    this.setState(
      update(this.state, {
        videos: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    )
    this.props.updateVideoListOrder(this.state.videos)
  }

  handleDragOver (event) {
    event.stopPropagation()
  }

  render () {
    const { videos } = this.state

    return (
      <span onDragOver={this.handleDragOver} className='playlist-container'>
        {videos &&
          videos.map((video, index) => (
            <Videocard
              key={video.id}
              id={video.id}
              index={index}
              title={video.title}
              card={video}
              listId={1}
              channel={video.channel}
              thumbnail={video.thumb}
              onRemove={() => this.props.onRemove(video.id)}
              moveCard={this.moveCard.bind(this)}
            />
          ))}
      </span>
    )
  }
}

const cardTarget = {
  drop (props) {
    return {
      listId: props.id
    }
  }
}

export default DropTarget('VIDEOCARD', cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Playlist)
