# YouTube Playlists

React app for creating on-the-fly YouTube playlists.

## Getting Started

Simply drag-and-drop a YouTube URL / Tab onto the page and it will be added to the playlist.

Once you've got your playlist gathered, press "Play" and the application will begin auto-playing your playlist, optionally in fullscreen throughout the whole playlist - a feature missing from many other similar applications I've tried in the past.

## Requirements

The only requirement to host your own instance is a YouTube API Key. You can visit [developers.google.com/youtube/v3/getting-started](https://developers.google.com/youtube/v3/getting-started) to view how to get one. 

Then simply replace the placeholder `KEY = 'GOOGLE_API'` in `src/components/playlist/playlist.js` on line 18 with your key.

## Contributing

This is very much still in beta stage, but you can visit my staging instance (hosted on github pages) at [youtube.ndo.dev](https://youtube.ndo.dev) or run it locally by:

1. Clone the repo `git clone https://github.com/ndom91/youtube-playlists`  
2. Install dependencies `npm i`  
3. Start dev server `npm start`  
4. Visit `localhost:3000`

## Screenshots

![screenshot 1](https://imgur.com/e7rd3Rk.png)

