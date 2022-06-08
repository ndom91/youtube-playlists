import useStore from '@/lib/store'

const Sidebar = ({ onPlay }) => {
  const { autoplay, fullscreen } = useStore((state) => state.videoOpts)
  const clearVideos = useStore((state) => state.clearVideos)

  const toggleFullscreen = () => {
    if (fullscreen) {
      useStore.setState({ videoOpts: { autoplay, fullscreen: false } })
    } else {
      useStore.setState({ videoOpts: { autoplay, fullscreen: true } })
    }
  }

  const toggleAutoplay = () => {
    if (autoplay) {
      useStore.setState({ videoOpts: { fullscreen, autoplay: false } })
    } else {
      useStore.setState({ videoOpts: { fullscreen, autoplay: true } })
    }
  }
  return (
    <div className="flex w-72 flex-col items-stretch justify-between rounded-md border-[6px] border-purple-300 bg-purple-200 ">
      <div className="m-8 flex flex-col space-y-4">
        <input
          type="checkbox"
          id="fullscreenCheckbox"
          onChange={toggleFullscreen}
          value="Fullscreen"
          className="invisible"
        />
        <label
          htmlFor="fullscreenCheckbox"
          className="flex items-center justify-center rounded-md bg-orange-100 p-2 text-orange-700 shadow-lg ring-8 ring-orange-200 transition hover:cursor-pointer"
        >
          <svg
            fill="currentColor"
            className={`${
              fullscreen ? 'block' : 'hidden'
            } h-16 w-16 transition`}
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            fill="currentColor"
            className={`${
              fullscreen ? 'hidden' : 'block'
            } h-16 w-16 transition`}
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-4 text-xl uppercase">Fullscreen</span>
        </label>
        <input
          className="invisible"
          defaultChecked
          type="checkbox"
          id="autoplayCheckbox"
          onChange={toggleAutoplay}
          value="checked"
        />
        <label
          htmlFor="autoplayCheckbox"
          className="flex items-center justify-center rounded-md bg-orange-100 p-2 text-orange-700 shadow-lg ring-8 ring-orange-200 transition hover:cursor-pointer"
        >
          <svg
            fill="currentColor"
            className={`${autoplay ? 'block' : 'hidden'} h-16 w-16 transition`}
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            fill="currentColor"
            className={`${autoplay ? 'hidden' : 'block'} h-16 w-16 transition`}
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-4 text-xl uppercase">Autoplay</span>
        </label>
      </div>

      <div className="my-4 flex w-full justify-around">
        <button
          className="rounded-md bg-orange-600 px-5 py-2 text-white  ring-4 ring-orange-700 transition hover:bg-orange-800"
          onClick={onPlay}
        >
          <span className="ripple">Play</span>
        </button>

        <button
          className="rounded-md bg-orange-600 px-5 py-2 text-white ring-4 ring-orange-700 transition hover:bg-orange-800"
          onClick={clearVideos}
        >
          <span className="ripple">Clear</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
