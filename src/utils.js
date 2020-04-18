export const parseYoutubeUrl = Url => {
  if (Url.length === 11 || Url.length === 13) {
    // Passed in argument was Id already
    return Url
  }
  let videoId

  if (Url.includes('youtu.be')) {
    videoId = Url
      .substring(Url.indexOf('tu.be/') + 6)
  } else if (Url.includes('youtube.com')) {
    videoId = Url
      .substring(Url.indexOf('v=') + 2, Url.length)
      .substring(0, 11)
  } else if (Url.length === 11) {
    videoId = Url
  }

  return videoId
}

export const addVideoToHash = videoId => {
  let x
  if (window.location.hash.length > 1) {
    const videoIdsFromUrl = JSON.parse(window.atob(decodeURIComponent(window.location.hash.slice(1))))
    if (!videoIdsFromUrl.includes(videoId)) {
      if (Array.isArray(videoIdsFromUrl)) {
        x = JSON.stringify([...videoIdsFromUrl, videoId])
      } else {
        x = JSON.stringify([videoIdsFromUrl, videoId])
      }
    } else {
      x = JSON.stringify(videoIdsFromUrl)
    }
  } else {
    x = JSON.stringify(videoId)
  }
  window.history.replaceState(null, null, `#${encodeURIComponent(window.btoa(x))}`)
}

export const removeVideoFromHash = videoId => {
  const videoIdsFromUrl = JSON.parse(window.atob(decodeURIComponent(window.location.hash.slice(1))))
  if (videoIdsFromUrl.includes(videoId)) {
    if (Array.isArray(videoIdsFromUrl)) {
      const remainingVideos = JSON.stringify(videoIdsFromUrl.filter(id => id !== videoId))
      window.history.replaceState(null, null, `#${encodeURIComponent(window.btoa(remainingVideos))}`)
    } else {
      // const remainingVideos = JSON.stringify(videoIdsFromUrl.filter(id => id !== videoId))
      window.history.replaceState(null, null, '#')
    }
  }
}

export const fetchVideoDetails = async id => {
  return window.fetch(`https://yt-details.ndo.workers.dev/?vid=${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    crossdomain: true
  })
    .then(resp => resp.json())
    .then(json => json)
}
