import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faTrash } from '@fortawesome/free-solid-svg-icons'
import './videocard.css'


class Videocard extends React.Component {
  constructor(props) {
    super(props)

    // const {
    //   id,
    //   url,
    //   title,
    //   desc,
    //   channel,
    //   time,
    //   views
    // } = this.props

    this.state = {
      isResolved: false
    }
  }


  handleOnClick = (e) => {
    e.preventDefault()
    // console.log('card click!')
  }

  // deleteFn = (e) => {
  //   e.preventDefault()
  //   console.log(e.target)
  //   const videoId = 1
  //   this.props.onRemove(videoId)
  // }

  render() { 
    
  library.add(fas, faTrash)

    const {
      id,
      url,
      title,
      channel,
      thumbnail
    } = this.props


    const Thumb = styled.article`
      width: auto;
      height: 113px;
      background: url(${thumbnail}) no-repeat center;
      background-size: cover;
      border-radius: 3px;
    `

    // COLOR THIEF ATTEMPT AT GETTING COLOR FROM THUMBNAIL PHOTO TO STYLE THE CARD / DELETE BUTTON COLORS DEPENDING ON THE IMG

    // console.log(thumbnail)

    // const myHeaders = new Headers()

    // myHeaders.append('Content-Type', 'text/plain')
    // myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000') 

    // fetch(thumbnail, {
    //   headers: myHeaders,
    //   mode: 'no-cors'
    // })
    // .then(resp => {
    //   console.log('resp',resp)
    //   return resp.blob()
    // })
    // .then(img => {
    //   console.log('img', img)
    //   const imgUrl = URL.createObjectURL(img)

    //   console.log(imgUrl)
    //   console.log(img)
    //   // var imgElem = document.createElement('img');
    //   var imgElem = new Image()
    //   imgElem.src = imgUrl

    //   const ColorThief = require('color-thief')
    //   const colorThief = new ColorThief()
      
    //   colorThief.getPalette(imgElem)
    // })
    // .catch(err => console.log(err))

    // const ColorThief = require('color-thief')
    // const colorThief = new ColorThief()
    // colorThief.getPalette(img)

    const deleteIcon = <FontAwesomeIcon icon={['fas', 'trash']} />

    return <div 
          id="videocard" 
          className="videocard"
          onClick={this.handleOnClick}
          key={id}
          >
            <button onClick={this.props.onRemove} className="btn-floating">{deleteIcon}</button>
            <article className="card">
              <a href={url}>
                <Thumb />
                <div className="infos">
                  <h2 className="title">{title}</h2>
                  <h3 className="channel">{channel}</h3>
                </div>
              </a>
            </article>
          </div>
  }
}

export default Videocard