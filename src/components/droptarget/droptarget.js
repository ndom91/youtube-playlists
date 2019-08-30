import React from 'react'
import './droptarget.min.css'
import { toast } from 'react-toastify'

const Droptarget = props => {
  const dragoverHandler = ev => {
    ev.preventDefault()
    // const droppedUrl = ev.dataTransfer.getData('text/plain')
    console.log(ev.nativeEvent)
    if (ev.nativeEvent.srcElement !== ev.nativeEvent.target) {
      const el = document.getElementById('dropTarget')
      el.style.visibility = 'visible'
      ev.dataTransfer.dropEffect = 'link'
    }
  }

  const dropHandler = ev => {
    ev.preventDefault()
    ev.persist()
    const droppedUrl = ev.dataTransfer.getData('text/plain')
    if (droppedUrl && !droppedUrl.includes('youtube.com/watch')) {
      toast.info('Must be a YouTube Link!', {
        className: 'info-toast',
        progressClassName: 'progress-toast'
      })
      const el = document.getElementById('dropTarget')
      el.style.visibility = 'hidden'
      return
    }

    props.callbackFromParent(droppedUrl)

    const el = document.getElementById('dropTarget')
    el.style.visibility = 'hidden'
  }

  return (
    <div
      id="dropTarget"
      className="fullDroptarget"
      onDrop={dropHandler}
      onDragOver={dragoverHandler}
    ></div>
  )
}

export default Droptarget
