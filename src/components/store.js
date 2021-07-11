import create from 'zustand'

const useStore = create(set => ({
  videoOpts: {
    autoplay: true,
    fullscreen: false,
  },
  videos: [],
  clearVideos: () =>
    set(state => {
      window?.history.replaceState(null, null, `#`)
      return (state.videos = [])
    }),
  addVideo: video => {
    set(state => state.videos.push(video))
  },
}))

export default useStore
