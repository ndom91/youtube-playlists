import { useState } from 'react'
import { toast } from 'react-toastify'

const Droptarget = ({ visible, closeDropzone, addVideoOnDrop }) => {
  const [draggingOver, setDragOver] = useState(false)
  const [dragTarget, setDragtarget] = useState('')

  const dropHandler = (e) => {
    e.preventDefault()
    e.persist()
    const droppedUrl = e.dataTransfer.getData('text/plain')
    if (droppedUrl && !droppedUrl.includes('youtu')) {
      toast.info('Must be a YouTube Link!', {
        className: 'info-toast',
        progressClassName: 'progress-toast',
      })
      closeDropzone()
      return
    }

    addVideoOnDrop(droppedUrl)
    setDragOver(false)
    closeDropzone()
  }

  const handleDragOver = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const hideDropTarget = () => {
    closeDropzone()
  }

  const handleDragEnter = (e) => {
    setDragOver(true)
    e.preventDefault()
    e.stopPropagation()
    setDragtarget(e.target)
  }
  const handleDragLeave = (e) => {
    if (dragTarget === e.target) {
      setDragOver(false)
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <>
      {visible && (
        <div
          className={`${
            draggingOver ? 'dragging-over' : ''
          } relative h-96 w-96 bg-teal-600 rounded-md border-8 border-white text-3xl text-center shadow-xl flex justify-center items-center transition`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={dropHandler}
          id="droptarget"
        >
          <button
            onClick={hideDropTarget}
            className="absolute right-0 top-0 w-8 h-8 m-4 rounded-full hover:cursor-pointer transition"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{ marginTop: '4px' }}
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div>Drop Video Here</div>
        </div>
      )}
    </>
  )
}

export default Droptarget
