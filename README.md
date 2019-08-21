# YouTube Playlists

[![Greenkeeper badge](https://badges.greenkeeper.io/ndom91/youtube-playlists.svg)](https://greenkeeper.io/)

![GitHub](https://img.shields.io/github/license/ndom91/youtube-playlists.svg?style=flat-square)
![GitHub tag (latest SemVer pre-release)](https://img.shields.io/github/tag-pre/ndom91/youtube-playlists.svg?&style=flat-square)
![David](https://img.shields.io/david/ndom91/youtube-playlists.svg?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues-raw/ndom91/youtube-playlists.svg?style=flat-square)
![CircleCI](https://img.shields.io/circleci/build/github/ndom91/youtube-playlists.svg?style=flat-square)

React app for creating on-the-fly YouTube playlists. Demo available at: [youtube.ndo.dev](https://youtube.ndo.dev)  

## Getting Started

Simply drag-and-drop a YouTube URL / Tab onto the page and it will be added to the playlist. Optionally, it will also recognize YouTube URLs in your clipboard once you focus onto the page and ask if youd like to add the video.

Once you've got your playlist organized, press "Play" and the application will begin auto-playing your playlist, optionally in staying in fullscreen through the remainder of the dynamic playlist.

## Requirements

The only requirement to host your own instance is a YouTube API Key. You can visit [developers.google.com/youtube/v3/getting-started](https://developers.google.com/youtube/v3/getting-started) to view how to get one.

The functionality to get the youtube video details is provided through a serverless function, running on a Cloudflare Worker in the demo instance. I've provided the code for it as well, in the `serverless_youtube.js` file. 

If you want to setup your own instance, you need to do the following:

1. Get your own YouTube API Key
2. Sign up for Cloudflare Workers
3. Create a new worker and copy the code from `serverless_youtube.js` into the Web UI
4. Insert your YouTube API Key on line 2 in the variable `key`
5. Adjust the `fetch` URL in `src/index.js` on line 111

## Contributing

This is very much still in beta stage, but you can run it locally by:

1. Clone the repo `git clone https://github.com/ndom91/youtube-playlists`
2. Install dependencies `npm i`
3. Start dev server `npm start`
4. Visit `localhost:3000`

## Screenshots

![screenshot 1](https://imgur.com/80espJg.png)
