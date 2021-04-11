# 📽️ YouTube Playlists

![GitHub package.json version](https://img.shields.io/github/package-json/v/ndom91/youtube-playlists?style=flat-square)
![GitHub](https://img.shields.io/github/license/ndom91/youtube-playlists.svg?style=flat-square)
![David](https://img.shields.io/david/ndom91/youtube-playlists.svg?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues-raw/ndom91/youtube-playlists.svg?style=flat-square)


⚛️ React app for creating on-the-fly YouTube playlists. 

> **Demo available at**: [`youtube.ndo.dev`](https://youtube.ndo.dev)  

## 🏁 Getting Started

Simply drag-and-drop a YouTube URL / Tab onto the page and it will be added to the playlist. Alternatively, if given permission, it will also recognize YouTube URLs in your clipboard once you focus onto the page and ask if youd like to add the video to your playlist.

Once you've got your playlist organized, press "Play" and the application will begin auto-playing your videos, optionally staying in fullscreen mode throughout the remainder of the playlist.

## ⚛️ Features

- Create on the fly playlists from YouTube without cluttering your real YouTube saved playlists
- Progressive Web App - Installable on Mobile
- Web Share Target - You can 'share' from any other Android App to this App.
- Shareable Playlist URLs - Data is embeded into the URL Hash
- (**Coming Soon**) Google Cast Functionality

## 🧍 Selfhost

You can selfhost this application if you wish, details can be found below. The site itself is a simple react application which you can host on any provider like Netlify, Vercel, etc. There is also a Lambda / Cloudflare Worker component to the application for getting video details from the YouTube API.

### ⚓ Requirements

The only requirement to host your own instance, other than hosting the page itself, is a YouTube API Key. You can visit [developers.google.com/youtube/v3/getting-started](https://developers.google.com/youtube/v3/getting-started) for details on how to get your own key.

The functionality to fetch the video details happens in a serverless function, here designed to be run in a Cloudflare Worker. You can find the code for it in the `serverless_youtube.js` file. These few functions can simply be copied back into `index.js` if you prefer to not use a worker / serverless function, however then your YouTube API key will be part of the frontend bundle shipped to each user.

### 👷 Getting Started

In order to setup your own instance, you need to do the following:

1. Get your own [YouTube API Key](https://developers.google.com/youtube/v3/getting-started)
2. Sign up for a free Cloudflare Workers account
3. Create a [new worker](https://cloudflareworkers.com/) and copy the code from `serverless_youtube.js` into the application
4. Insert your YouTube API Key on line 2 in the variable `key`
5. Adjust the `fetch` URL in `src/index.js` on line `111` to your own worker URL
6. You can also uncomment line `37` to restrict CORS to only your frontend domain
7. Deploy the worker and the frontend to your host of choice 🎉

## 🙏 Contributing

This is very much still in early stages, but you can run it locally by:

1. Clone the repo `git clone https://github.com/ndom91/youtube-playlists`
2. Install dependencies `npm install`
3. Start dev server `npm start`
4. Visit `http://localhost:3000`

Please stick to the prettier / style-lint settings when creating a PR.

## 📺 Screenshot

![screenshot 1](screenshot1.gif)

## 📝 License

[`MIT`](https://github.com/ndom91/youtube-playlists/blob/master/LICENSE)
