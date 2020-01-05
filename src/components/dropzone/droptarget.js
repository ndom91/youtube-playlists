import React from 'react'
import './droptarget.min.css'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fas, faTimes } from '@fortawesome/free-solid-svg-icons'

const Droptarget = props => {
  library.add(fas, faTimes)
  config.autoA11y = true

  const deleteIcon = <FontAwesomeIcon icon={['fas', 'times']} />
  const dropHandler = ev => {
    ev.preventDefault()
    ev.persist()
    const droppedUrl = ev.dataTransfer.getData('text/plain')
    if (droppedUrl && !droppedUrl.includes('youtu')) {
      toast.info('Must be a YouTube Link!', {
        className: 'info-toast',
        progressClassName: 'progress-toast'
      })
      const el = document.getElementById('droptarget')
      el.style.visibility = 'hidden'
      return
    }

    props.addVideoOnDrop(droppedUrl)

    const el = document.getElementById('droptarget')
    el.style.visibility = 'hidden'
  }

  const hideDropTarget = () => {
    const el = document.getElementById('droptarget')
    el.style.visibility = 'hidden'
  }

  return (
    <div id='droptarget' onDrop={dropHandler} className='hoverDropZone'>
      <button onClick={hideDropTarget} className='dropZoneCloseBtn'>
        {deleteIcon}
      </button>
      <div>Drop Video Here</div>
    </div>
  )
}

export default Droptarget
