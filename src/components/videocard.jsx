import React, { useRef } from 'react'
import { useDrag, useDrop, DragPreviewImage } from 'react-dnd'
import useStore from '@/lib/store'
// import * as S from './styled'
import { removeVideoFromHash } from '@/lib/utils'

const handleOnClick = (e) => {
  e.preventDefault()
}

// const FetchSpinner = () => {
//   return (
//     <S.FetchLoader>
//       <S.CubeContainer>
//         <S.Cube>
//           <div className="front" />
//           <div className="back" />
//           <div className="right" />
//           <div className="left" />
//           <div className="top" />
//           <div className="bottom" />
//         </S.Cube>
//         <S.Shadow>,</S.Shadow>
//       </S.CubeContainer>
//     </S.FetchLoader>
//   )
// }

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
    <div ref={ref} style={{ display: 'inline-block', opacity }}>
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
          className="relative mx-4 my-2 block h-48 w-48 overflow-hidden rounded-lg border border-gray-100 bg-white p-2 hover:cursor-pointer"
          href=""
        >
          <span className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

          <div className="justify-between sm:flex">
            <div className="ml-3 hidden flex-shrink-0 sm:block">
              <button
                onClick={(e) => handleVideoRemove(e, id)}
                className="absolute -top-4 -left-2 h-8 w-8 cursor-pointer rounded-md transition hover:-translate-y-2"
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
            </div>
          </div>

          <img
            className="aspect-video"
            alt="Video Thumbnail"
            src={thumbnail.medium.url}
          />

          <dl className="mt-6 flex">
            <div className="flex flex-col">
              <dt className="text-xs uppercase text-gray-600">{channel}</dt>
              <dd className="text-sm text-gray-500">{title}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  )
}

export default Videocard
