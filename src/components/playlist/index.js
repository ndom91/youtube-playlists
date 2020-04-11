import React from 'react'
import Videocard from '../videocard'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Store from '../store'

const Playlist = props => {
  const store = Store.useStore()

  const moveCard = (dragIndex, hoverIndex) => {
    const videos = store.get('videos')
    const dragCard = videos[dragIndex]

    videos.splice(dragIndex, 1)
    videos.splice(hoverIndex, 0, dragCard)

    store.set('videos')(videos)
  }

  const handleDragOver = (event) => {
    event.stopPropagation()
  }

  return (
    <div id='playlist' className='item footer playlist'>
      <span onDragOver={handleDragOver} className='playlist-container'>
        <DndProvider backend={HTML5Backend}>
          {store.get('videos') &&
            store.get('videos').map((video, index) => (
              <Videocard
                key={video.id}
                id={video.id}
                index={index}
                title={video.title}
                card={video}
                listId={1}
                channel={video.channel}
                thumbnail={video.thumb}
                moveCard={moveCard}
                fetchInProgress={props.fetchInProgress}
              />
            ))}
        </DndProvider>
      </span>
    </div>
  )
}

export default Playlist
