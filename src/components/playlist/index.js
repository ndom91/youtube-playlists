import React, { useState, useRef, useEffect } from 'react'
import Videocard from '../videocard'
import { DropTarget } from 'react-dnd'

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

  const FetchSpinner = () => {
    if (props.fetchInProgress) {
      return (
        <div className='fetchSpinnerDiv'>
          <div className='cube-container'>
            <div id='cube'>
              <div className='front' />
              <div className='back' />
              <div className='right' />
              <div className='left' />
              <div className='top' />
              <div className='bottom' />
            </div>
            <div id='shadow'>,</div>
          </div>

        </div>
      )
    } else {
      return null
    }
  }

  console.log(videos)
  return (
    <span onDragOver={handleDragOver} className='playlist-container'>
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
          />
        ))}
      <FetchSpinner />
    </span>
  )
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
