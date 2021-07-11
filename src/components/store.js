import create from 'zustand'

const useStore = create(set => ({
  videoOpts: {
    autoplay: true,
    fullscreen: false,
  },
  videos: [],
  clearVideos: () => set(state => (state.videos = [])),
  addVideo: video => {
    set(state => state.videos.push(video))
  },
}))

export default useStore
