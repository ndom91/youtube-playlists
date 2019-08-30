import React, { useState, useCallback } from 'react'
import update from 'immutability-helper'
import Videocard from '../videocard/videocard'

const Playlist = props => {
  const { videoDetailsList } = props
  const videosList = videoDetailsList

  const [videos, setVideos] = useState(videosList)
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = videos[dragIndex]
      setVideos(
        update(videos, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        })
      )
      // const dragCard = videosList[dragIndex]
      // let newVideoDetailsList = []
      // newVideoDetailsList = videosList.filter(video => video.id !== dragCard.id)
      // newVideoDetailsList[hoverIndex] = dragCard
      // videosList = newVideoDetailsList
    },
    [videos]
  )
  return (
    <span className="playlist-container">
      {videosList &&
        videosList.map((video, index) => (
          <Videocard
            key={video.id}
            id={video.id}
            index={index}
            title={video.title}
            channel={video.channel}
            thumbnail={video.thumb}
            onRemove={() => props.onRemove(video.id)}
            moveCard={moveCard}
          />
        ))}
    </span>
  )
}

export default Playlist
