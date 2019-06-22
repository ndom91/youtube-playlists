import axios from 'axios'

const KEY = 'AIzaSyCAvRM6NKv8bRkO4uJ1ZP8N9nv-qhQRLMQ'

axios.defaults.headers.common = {
  ...axios.defaults.headers.common,
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  "Content-Type": 'application/json',
};
// axios.defaults.preflightContinue = true;
//axios.defaults.crossDomain = true;

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    key: KEY
  },
  headers: { 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000', "Content-Type": 'application/json'}
})