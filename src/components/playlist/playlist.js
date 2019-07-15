import React from 'react'
import './playlist.min.css'
import Videocard from '../videocard/videocard'

class Playlist extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      videoDeetsList: [],
      videoIds: []
    }
  }

  updateList = (videoUrl) => {
    // console.log(videoUrl)
    // console.log(typeof (videoUrl))
    if (videoUrl) {
      const videoId = videoUrl.substring(videoUrl.indexOf('v=') + 2, videoUrl.length)
      if (!this.state.videoIds.includes(videoId)) {
        this.state.videoIds.push(videoId)
        const videoDeetsPromise = this.props.getVideoDetails(videoId)
        const videoDeets = Promise.resolve(videoDeetsPromise)
        videoDeets.then(deets => {
          this.setState({ videoDeetsList: [...this.state.videoDeetsList, deets] })
        })
      }
    }
  }

  removeVid = (id) => {
    const remainderDeets = this.state.videoDeetsList.filter(video => video.id !== id)
    const remainderIds = this.state.videoIds.filter(video => video !== id)
    console.log(remainderDeets, remainderIds)
    this.setState({ videoDeetsList: remainderDeets, videoIds: remainderIds })
  }

  render () {
    const {
      videoDeetsList
    } = this.state

    const {
      videoListP = []
    } = this.props

    const videoUrl = videoListP[videoListP.length - 1]
    this.updateList(videoUrl)

    return (
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
