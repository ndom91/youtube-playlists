import React from 'react'
import Videocard from '../videocard/videocard'
import './playlist.css'
import youtube from '../apis/youtube';

class Playlist extends React.Component {
  constructor(props) {
    super(props)

    const { } = this.props

    this.state = {

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
    const video = this.getVideoDetails('BBWMIxXqr-E')

    // video1.then((resp) => { 
    //   console.log(resp)
    // })
    const video1 = Promise.resolve(video)

    console.log(video1)

      return <div 
            id="playlist" 
            className="item footer playlist"
            >
              <Videocard
                id="1"
                url={video1.url}
                title={video1.title}
                channel={video1.channel}
                thumbnail={video1.thumb}
              />
              <Videocard
                id="2"
                url="https://youtube.com/watch?v=bj3kjH3h"
                title="Best UI/UX Design Desktops on Linux"
                channel="InfinitelyGalactic"
              />
            </div>
  }
}

export default Playlist