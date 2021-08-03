import React from 'react'
import Videocard from '../videocard'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import useStore from '@/lib/store'

const Playlist = ({ fetchInProgress }) => {
  const videos = useStore((state) => state.videos)

  const moveCard = (dragIndex, hoverIndex) => {
    const _videos = [...videos]
    const dragCard = videos[dragIndex]

    _videos.splice(dragIndex, 1)
    _videos.splice(hoverIndex, 0, dragCard)

    useStore.setState((state) => (state.videos = _videos))
  }

  const handleDragOver = (event) => {
    event.stopPropagation()
  }

  return (
    <div id="playlist" className="item footer playlist">
      <span onDragOver={handleDragOver} className="playlist-container">
        <DndProvider backend={HTML5Backend}>
          {videos &&
            videos.map((video, index) => {
              return (
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
                  fetchInProgress={fetchInProgress}
                />
              )
            })}
        </DndProvider>
      </span>
    </div>
  )
}

export default Playlist
