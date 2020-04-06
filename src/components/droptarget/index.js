import React from 'react'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fas, faTimes } from '@fortawesome/free-solid-svg-icons'

import * as S from './styled'

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
      props.closeDropzone()
      return
    }

    props.addVideoOnDrop(droppedUrl)
    props.closeDropzone()
  }

  const hideDropTarget = () => {
    props.closeDropzone()
  }

  return (
    <>
      {props.visible
        ? <S.HoverDropzone onDrop={dropHandler} className='hoverDropZone'>
          <S.DropzoneBtn onClick={hideDropTarget} className='dropZoneCloseBtn'>
            {deleteIcon}
          </S.DropzoneBtn>
          <div>Drop Video Here</div>
        </S.HoverDropzone>
        : null}
    </>
  )
}

export default Droptarget
