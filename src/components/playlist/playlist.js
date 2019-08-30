import React from 'react'
import update from 'immutability-helper'
import Videocard from '../videocard/videocard'
import { DropTarget } from 'react-dnd'

class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = { videos: props.videoDetailsList }
  }

  // componentWillReceiveProps() {
  //   this.setState({ videos: this.props.videoDetailsList })
  // }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.videoDetailsList !== this.state.videos) {
      this.setState({ videos: nextProps.videoDetailsList })
    }
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { videos } = this.state
    const dragCard = videos[dragIndex]

    this.setState(
      update(this.state, {
        videos: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    )
    // this.setState(
    //   update(this.state, {
    //     videos: {
    //       $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
    //     }
    //   })
    // )
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
              moveCard={this.moveCard}
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
