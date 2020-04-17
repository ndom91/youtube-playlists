async function getVideoDetails (id, hostname) {
  const key = 'YOUTUBE_API_KEY'
  if (!id) {
    return 'Please provide an id'
  }

  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&key=${key}`, {
    headers: {
      'Access-Control-Allow-Origin': hostname,
      'Content-Type': 'application/json'
    },
    crossdomain: true
  })
    .then(resp => resp.json())
    .then((response) => {
      const videoDetails = response.items[0].snippet
      const channel = videoDetails.channelTitle
      const title = videoDetails.localized.title
      const thumbnails = videoDetails.thumbnails

      const videoDetailsObj = {
        id: id,
        title: title,
        channel: channel,
        thumb: thumbnails
      }
      return videoDetailsObj
    })
    .catch(() => {
      return 'Invalid id or failed request to YouTube'
    })
  return response
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Origin': "https://yourdomain",
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

async function handleRequest (request) {
  const url = new URL(request.url)
  const hostname = url.hostname
  const videoId = url.searchParams.get('vid')
  const videoDetails = await getVideoDetails(videoId, hostname)
  return new Response(JSON.stringify(videoDetails), {
    headers: corsHeaders,
    status: 200
  })
}

addEventListener('fetch', event => {
  if (event.request.method !== 'PUT' || event.request.method !== 'DELETE') {
    return event.respondWith(handleRequest(event.request))
  } else {
    return new Response(null, {
      status: 405,
      statusText: 'Method Not Allowed'
    })
  }
})
