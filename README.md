# YouTube Playlists

![GitHub](https://img.shields.io/github/license/ndom91/youtube-playlists.svg?style=flat-square)
![GitHub tag (latest SemVer pre-release)](https://img.shields.io/github/tag-pre/ndom91/youtube-playlists.svg?&style=flat-square)
![David](https://img.shields.io/david/ndom91/youtube-playlists.svg?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues-raw/ndom91/youtube-playlists.svg?style=flat-square)
![CircleCI](https://img.shields.io/circleci/build/github/ndom91/youtube-playlists.svg?style=flat-square)

React app for creating on-the-fly YouTube playlists.

## Getting Started

Simply drag-and-drop a YouTube URL / Tab onto the page and it will be added to the playlist. Optionally, it will also recognize YouTube URLs in your clipboard once you focus onto the page and ask if youd like to add the video.

Once you've got your playlist organized, press "Play" and the application will begin auto-playing your playlist, optionally in staying in fullscreen through the remainder of the dynamic playlist.

## Requirements

The only requirement to host your own instance is a YouTube API Key. You can visit [developers.google.com/youtube/v3/getting-started](https://developers.google.com/youtube/v3/getting-started) to view how to get one.

Then simply replace the placeholder `KEY = 'YOUTUBE_API_KEY'` in `src/index.js` on line 120 with your key.

## Contributing

This is very much still in beta stage, but you can run it locally by:

1. Clone the repo `git clone https://github.com/ndom91/youtube-playlists`
2. Install dependencies `npm i`
3. Start dev server `npm start`
4. Visit `localhost:3000`

## Screenshots

![screenshot 1](https://imgur.com/80espJg.png)
