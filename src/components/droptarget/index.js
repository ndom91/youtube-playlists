import React, { useState } from 'react'
import { toast } from 'react-toastify'

import * as S from './styled'

const Droptarget = props => {
  const [draggingOver, setDragOver] = useState(false)
  const [dragTarget, setDragtarget] = useState('')

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
          id='droptarget'
        >
          <S.DropzoneBtn onClick={hideDropTarget}>
            <svg fill='currentColor' viewBox='0 0 20 20' style={{ marginTop: '4px' }}>
              <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
            </svg>
          </S.DropzoneBtn>
          <div>Drop Video Here</div>
        </S.HoverDropzone>
      )}
    </>
  )
}

export default Droptarget
