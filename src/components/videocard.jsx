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
        <div aria-label="Loading..." role="status">
          <svg class="h-6 w-6 animate-spin" viewBox="3 3 18 18">
            <path
              class="fill-gray-200"
              d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
            ></path>
            <path
              class="fill-gray-800"
              d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
            ></path>
          </svg>
        </div>
      ) : (
        <div
          id="videocard"
          style={{
            opacity,
          }}
          onClick={handleOnClick}
          key={id}
          className="relative mx-4 my-2 block aspect-video h-40 rounded-md border border-gray-100 bg-white hover:cursor-pointer"
          href=""
        >
          <div className="justify-between sm:flex">
            <div className="ml-3 hidden flex-shrink-0 sm:block">
              <button
                onClick={(e) => handleVideoRemove(e, id)}
                className="absolute -top-2 -right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-fuchsia-50 text-fuchsia-400 ring-2 ring-fuchsia-400 drop-shadow-md transition hover:-translate-y-0.5 hover:drop-shadow-xl"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="h-5 w-5"
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
            className="aspect-video rounded-md "
            alt="Video Thumbnail"
            src={thumbnail.medium.url}
          />

          <dl className="absolute -bottom-1 left-0 flex w-full flex-col rounded-md bg-[linear-gradient(to_top,#fff_0%,#fff_25%,#ffffff50_70%,#ffffff10_90%,#ffffff00_100%)] px-2 pt-8 pb-2">
            <dt className="text-sm font-extrabold uppercase text-fuchsia-800">
              {channel}
            </dt>
            <dd className="text-md truncate text-ellipsis text-slate-800">
              {title}
            </dd>
          </dl>
        </div>
      )}
    </div>
  )
}

export default Videocard
