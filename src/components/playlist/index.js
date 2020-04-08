import React, { useState, useRef, useEffect } from 'react'
import Videocard from '../videocard'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const Playlist = props => {
  const [videos, setVideos] = useState([])

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (
      props.videoDetailsList &&
      props.videoDetailsList.length !== videos.length
    ) {
      setVideos(props.videoDetailsList)
    }
  }, [isFirstRender, props.videoDetailsList, props.videoDetailsList.length, videos.length])

  const moveCard = (dragIndex, hoverIndex) => {
    const newVideos = videos
    const dragCard = newVideos[dragIndex]

    newVideos.splice(dragIndex, 1)
    newVideos.splice(hoverIndex, 0, dragCard)

    setVideos(
      newVideos
    )

    props.updateVideoListOrder(videos)
  }

  const handleDragOver = (event) => {
    event.stopPropagation()
  }

  return (
    <span onDragOver={handleDragOver} className='playlist-container'>
      <DndProvider backend={HTML5Backend}>
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
              onRemove={() => props.onRemove(video.id)}
              moveCard={moveCard}
              fetchInProgress={props.fetchInProgress}
            />
          ))}
      </DndProvider>
    </span>
  )
}

export default Playlist
