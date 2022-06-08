import useStore from '@/lib/store'

const Sidebar = ({ handlePlay }) => {
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
          className="flex items-center justify-center rounded-md bg-orange-100 p-2 shadow-lg ring-4 ring-amber-200 transition hover:cursor-pointer"
        >
          <svg
            fill="currentColor"
            className={`${
              fullscreen ? 'block' : 'hidden'
            } h-8 w-8 text-emerald-400 transition`}
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
            } h-8 w-8 text-rose-400 transition`}
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-4 font-sans text-xl text-purple-500">
            Fullscreen
          </span>
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
          className="flex items-center justify-center rounded-md bg-orange-100 p-2 shadow-lg ring-4 ring-amber-200 transition hover:cursor-pointer"
        >
          <svg
            fill="currentColor"
            className={`${
              autoplay ? 'block' : 'hidden'
            } h-8 w-8 text-emerald-400 transition`}
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
              autoplay ? 'hidden' : 'block'
            } h-8 w-8 text-rose-400 transition`}
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-4 font-sans text-xl text-purple-500">
            Autoplay
          </span>
        </label>
      </div>

      <div className="my-4 flex w-full justify-around">
        <button
          onClick={handlePlay}
          class="inline-flex items-center space-x-1 rounded border border-indigo-600 px-4 py-2 text-indigo-600 transition hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
        >
          <span class="text-sm font-medium">Play</span>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button
          onClick={clearVideos}
          class="inline-flex items-center space-x-1 rounded border border-indigo-600 px-4 py-2 text-indigo-600 transition hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
        >
          <span class="text-sm font-medium">Clear</span>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
