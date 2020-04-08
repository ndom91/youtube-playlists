import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fas, faTimes } from '@fortawesome/free-solid-svg-icons'

import * as S from './styled'

const Droptarget = props => {
  library.add(fas, faTimes)
  config.autoA11y = true
  const [draggingOver, setDragOver] = useState(false)
  const [dragTarget, setDragtarget] = useState('')

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
      props.closeDropzone()
      return
    }

    props.addVideoOnDrop(droppedUrl)
    setDragOver(false)
    props.closeDropzone()
  }

  const hideDropTarget = () => {
    props.closeDropzone()
  }

  const handleDragEnter = e => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
    setDragtarget(e.target)
  }
  const handleDragLeave = e => {
    if (dragTarget === e.target) {
      e.preventDefault()
      e.stopPropagation()
      setDragOver(false)
    }
  }

  return (
    <>
      {props.visible && (
        <S.HoverDropzone
          onDragEnter={e => handleDragEnter(e)}
          onDragLeave={e => handleDragLeave(e)}
          onDrop={dropHandler}
          className={draggingOver ? 'dragging-over' : ''}
        >
          <S.DropzoneBtn onClick={hideDropTarget}>
            {deleteIcon}
          </S.DropzoneBtn>
          <div>Drop Video Here</div>
        </S.HoverDropzone>
      )}
    </>
  )
}

export default Droptarget
