import React from 'react'
import './droptarget.min.css'
import { toast } from 'react-toastify'

class Droptarget extends React.Component {
  dragoverHandler = ev => {
    ev.preventDefault()
    const el = document.getElementById('dropTarget')
    el.style.visibility = 'visible'
    ev.dataTransfer.dropEffect = 'link'
  }

  dropHandler = ev => {
    ev.preventDefault()
    ev.persist()
    const droppedUrl = ev.dataTransfer.getData('text/plain')
    if (!droppedUrl.includes('youtube.com/watch')) {
      toast.info('Must be a YouTube Link!', {
        className: 'info-toast',
        progressClassName: 'progress-toast'
      })
      const el = document.getElementById('dropTarget')
      el.style.visibility = 'hidden'
      return
    }

    this.props.callbackFromParent(droppedUrl)

    const el = document.getElementById('dropTarget')
    el.style.visibility = 'hidden'
  }

  render() {
    return (
      <div
        id="dropTarget"
        className="fullDroptarget"
        onDrop={this.dropHandler}
        onDragOver={this.dragoverHandler}
      ></div>
    )
  }
}

export default Droptarget
