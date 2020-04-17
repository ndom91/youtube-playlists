import { createConnectedStore, withReduxDevtools } from 'undux'

export default createConnectedStore({
  videos: [],
  videoOpts: { fullscreen: 0, autoplay: 1 }
}, withReduxDevtools)
