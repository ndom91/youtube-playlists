import React from 'react'
import { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faTrash } from '@fortawesome/free-solid-svg-icons'
import './videocard.min.css'

class Videocard extends React.Component {
  handleOnClick = e => {
    e.preventDefault()
  }

  render() {
    library.add(fas, faTrash)

    const { id, url, title, channel, thumbnail } = this.props

    const cardThumbnail = {
      width: 'auto',
      height: '120px',
      marginLeft: '-30px',
      marginTop: '-5px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '3px'
    }

    const deleteIcon = <FontAwesomeIcon icon={['fas', 'trash']} />

    return (
      <div
        id="videocard"
        className="videocard"
        onClick={this.handleOnClick}
        key={id}
      >
        <button onClick={this.props.onRemove} className="btn-floating">
          {deleteIcon}
        </button>
        <article className="card">
          <a href={url}>
            <img
              style={cardThumbnail}
              className="cardThumbnail"
              src={thumbnail}
            ></img>
            <div className="infos">
              <h2 className="title">{title}</h2>
              <h3 className="channel">{channel}</h3>
            </div>
          </a>
        </article>
      </div>
    )
  }
}

export default Videocard
