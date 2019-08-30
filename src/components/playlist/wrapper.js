import React, { Component } from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Playlist from './playlist'

class PlaylistWrapper extends Component {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <Playlist
          videoDetailsList={this.props.videoDetailsList}
          onRemove={this.props.onRemove}
        />
      </DndProvider>
    )
  }
}

export default PlaylistWrapper
