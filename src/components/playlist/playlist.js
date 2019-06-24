import React from 'react'
import Videocard from '../videocard/videocard'
import './playlist.css'
import youtube from '../apis/youtube';

class Playlist extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      videoDeetsList: [],
      videoIds: []
    }
  }

  getVideoDetails = async (id) => {
    const host = window.location.hostname
    const KEY = '[GOOGLE_API]'
    // const KEY = 'AIzaSyCAvRM6NKv8bRkO4uJ1ZP8N9nv-qhQRLMQ'
    const response = await youtube.get('/videos', {
      params: {
        id: id,
        part: 'snippet',
        key: KEY
      },
      headers: { 'Access-Control-Allow-Origin': host, "Content-Type": 'application/json'},
      crossdomain: true
    })

    if(response.data.items) {
      const videoDetails = response.data.items[0].snippet
      const channel = videoDetails.channelTitle
      const title = videoDetails.localized.title
      const thumbnail = videoDetails.thumbnails.medium.url

      return { 
        id: id,
        url: 'https://youtube.com/watch?v='+id, 
        title: title, 
        channel: channel, 
        thumb: thumbnail 
      }
    } else {
      alert('Video Info Loading Failed')
    }
  }

  updateList = (videoUrl) => {
    if(videoUrl) {
      const videoId = videoUrl.substring(videoUrl.indexOf('v=')+2,videoUrl.length)
      if(!this.state.videoIds.includes(videoId)) {
        this.state.videoIds.push(videoId)
        const videoDeetsPromise = this.getVideoDetails(videoId)
        const videoDeets = Promise.resolve(videoDeetsPromise)
        videoDeets.then(deets => {
          this.setState({ videoDeetsList: [...this.state.videoDeetsList, deets] })
        })
      }
    }
  }

  removeVid = (id) => {
    const remainder = this.state.videoDeetsList.filter(video => video.id !== id)
    this.setState({ videoDeetsList: remainder })
  }

  render() { 
    const {
      videoDeetsList
    } = this.state

    const { 
      videoListP = []
    } = this.props

    const videoUrl = videoListP[videoListP.length - 1]
    this.updateList(videoUrl)  

    return(
      videoDeetsList.map((video) => {
        return (
          <Videocard
            key={video.id}
            id={video.id}
            url={video.url}
            title={video.title}
            channel={video.channel}
            thumbnail={video.thumb}
            onRemove={this.removeVid.bind(this, video.id)}
          />
        )

      })
    )
  }
}

export default Playlist