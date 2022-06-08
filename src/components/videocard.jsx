import React, { useRef } from 'react'
import { useDrag, useDrop, DragPreviewImage } from 'react-dnd'
import useStore from '@/lib/store'
import { removeVideoFromHash } from '@/lib/utils'

const handleOnClick = (e) => {
  e.preventDefault()
}

const type = 'VideoCard'

const Videocard = ({
  id,
  url,
  title,
  channel,
  thumbnail,
  index,
  fetchInProgress,
  moveCard,
}) => {
  const ref = useRef(null)
  const videos = useStore((state) => state.videos)

  const [, drop] = useDrop({
    type: type,
    accept: type,
    hover(item) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type, id, index },
    type: type,
    accept: type,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const handleVideoRemove = (event, videoId) => {
    removeVideoFromHash(videoId)
    useStore.setState(
      (state) => (state.videos = videos.filter((video) => video.id !== videoId))
    )
    event.stopPropagation()
  }

  const opacity = isDragging ? 0.75 : 1

  return (
    <div ref={ref} className="inline-block" style={{ opacity }}>
      <DragPreviewImage connect={preview} src={thumbnail.default.url} />
      {fetchInProgress.state && fetchInProgress.id === id ? (
        <div>Loading</div>
      ) : (
        <div
          id="videocard"
          style={{
            opacity,
          }}
          onClick={handleOnClick}
          key={id}
          className="relative mx-4 my-2 block w-56 rounded-md border border-gray-100 bg-white p-2 hover:cursor-pointer"
          href=""
        >
          <span className="absolute inset-x-0 bottom-0 h-2 rounded-b-md  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

          <div className="justify-between sm:flex">
            <div className="ml-3 hidden flex-shrink-0 sm:block">
              <button
                onClick={(e) => handleVideoRemove(e, id)}
                className="absolute top-0 right-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-fuchsia-200 text-fuchsia-500 ring-4 ring-fuchsia-600 drop-shadow-md transition hover:-translate-y-0.5 hover:drop-shadow-xl"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <img
            className="aspect-video"
            alt="Video Thumbnail"
            src={thumbnail.medium.url}
          />

          <dl className="my-4 flex flex-col">
            <dt className="text-xs uppercase text-fuchsia-700 opacity-50">
              {channel}
            </dt>
            <dd className="truncate text-ellipsis text-sm text-slate-800">
              {title}
            </dd>
          </dl>
        </div>
      )}
    </div>
  )
}

export default Videocard
