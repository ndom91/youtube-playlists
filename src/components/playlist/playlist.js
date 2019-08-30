import React from 'react'
import update from 'immutability-helper'
import Videocard from '../videocard/videocard'
import { DropTarget } from 'react-dnd'

class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = { videos: props.videoDetailsList }
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log('cWU', nextProps.videoDetailsList, this.state.videos)
    if (nextProps.videoDetailsList.length !== this.state.videos.length) {
      this.setState({ videos: nextProps.videoDetailsList })
    }
  }

  pushCard(card) {
    this.setState(
      update(this.state, {
        videos: {
          $push: [card]
        }
      })
    )
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { videos } = this.state
    const dragCard = videos[dragIndex]

    console.log('1', this.state.videos)
    this.setState(
      update(this.state, {
        videos: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    )
    console.log('2', this.state.videos)
  }

  render() {
    const { canDrop, isOver } = this.props
    const isActive = canDrop && isOver

    const backgroundColor = isActive ? 'lightgreen' : 'rgba(0,0,0,0)'

    const { videos } = this.state

    return (
      <span style={{ backgroundColor }} className="playlist-container">
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
  drop(props, monitor, component) {
    const { id } = props
    const sourceObj = monitor.getItem()
    if (id !== sourceObj.listId) component.pushCard(sourceObj.card)
    return {
      listId: id
    }
  }
}

export default DropTarget('VIDEOCARD', cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Playlist)
