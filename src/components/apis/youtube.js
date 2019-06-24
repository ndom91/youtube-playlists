import axios from 'axios'

const host = window.location.hostname

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
  },
  headers: { 'Access-Control-Allow-Origin': host, "Content-Type": 'application/json'}
})