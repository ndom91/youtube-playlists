import React from 'react'
import Videocard from '../videocard/videocard'
import './playlist.css'
import youtube from '../apis/youtube';

class Playlist extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      videoDeetsList: []
    }
  }

  getVideoDetails = async (id) => {
    const KEY = 'AIzaSyCAvRM6NKv8bRkO4uJ1ZP8N9nv-qhQRLMQ'
    const response = await youtube.get('/videos', {
      params: {
        id: id,
        part: 'snippet',
        key: KEY
      },
      headers: { 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000', "Content-Type": 'application/json'},
      crossdomain: true
    })

    const videoDetails = response.data.items[0].snippet

    const channel = videoDetails.channelTitle
    const title = videoDetails.localized.title
    const thumbnail = videoDetails.thumbnails.medium.url

    return { 
      url: 'https://youtube.com/watch?v='+id, 
      title: title, 
      channel: channel, 
      thumb: thumbnail 
    }
  }

  render() { 
    const { 
      videoListP = []
    } = this.props

    const {
      videoDeetsList
    } = this.state

    const videoUrl = videoListP[videoListP.length - 1]

    if(videoUrl) {
      const videoId = videoUrl.substring(videoUrl.indexOf('v=')+2,videoUrl.length)

      console.log('videoId: ', videoId)

      const videoDeetsPromise = this.getVideoDetails(videoId)
      const videoDeets = Promise.resolve(videoDeetsPromise)
      videoDeets.then(deets => {
        videoDeetsList.push(deets)
      })
    }

    console.log('videoDeetsList: ', videoDeetsList)

    return(
      videoDeetsList.map(video => {
        return (
          <Videocard
            id="0"
            url={video.url}
            title={video.title}
            channel={video.channel}
            thumbnail={video.thumb}
          />
        )

      })
    )
  }
}

export default Playlist