# 📽️ YouTube Playlists

![GitHub package.json version](https://img.shields.io/github/package-json/v/ndom91/youtube-playlists?style=flat-square)
![GitHub](https://img.shields.io/github/license/ndom91/youtube-playlists.svg?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues-raw/ndom91/youtube-playlists.svg?style=flat-square)
[![Demo](https://img.shields.io/badge/click-demo-orange?style=flat-square)](https://youtube.ndo.dev)

[Next.js](https://nextjs.org) powered tool for creating on-the-fly YouTube playlists. 

**Demo available at**: [`youtube.ndo.dev`](https://youtube.ndo.dev)  

## ⚛️ Features

- Create on the fly playlists from YouTube without cluttering your real YouTube account's saved playlists
- Progressive Web App - Installable on mobile
- Web Share Target - You can 'share' from any other Android App to this PWA
- Shareable Playlist URLs - Send your friends the URL, share playlists without any accounts
- Google Cast Functionality [**Coming Soon**]

## 🏁 Getting Started

Simply drag-and-drop a YouTube URL / Tab onto the page and it will be added to the ephemeral playlist. Alternatively, if given permission, it will also recognize YouTube URLs in your clipboard once you focus onto the page and ask if you would like to add the video to your playlist.

Once you've got your playlist organized, press "Play" and the application will begin auto-playing your videos, optionally staying in fullscreen mode throughout the remainder of the playlist.

## 📺 Screenshot

![screenshot 1](screenshot1.gif)

## 🤓 Self-hosting

You can selfhost this application if you wish, details can be found below. The site itself is a simple React application which you can host on any provider like Netlify, Vercel, etc. There is also a serverless function / Cloudflare Worker component to the application for fetching video details from the YouTube API without exposing your YouTube API key in the frontend code.

### ⚓ Requirements

The only requirement to host your own instance, other than the hosting itself, is a YouTube API Key. You can visit [developers.google.com/youtube/v3/getting-started](https://developers.google.com/youtube/v3/getting-started) for details on how to obtain one.

Fetching the video details from YouTube happens in a serverless function. In our case it is designed to be run in a Cloudflare Worker. You can find the code for said worker in the `serverless_youtube.js` file. If you prefer not to use a worker, you can copy the few functions from that file back into `index.js`. Be aware, however, that your YouTube API key will then be part of the frontend bundle shipped to each user and visible in plaintext.

### 👷 Getting Started

In order to setup your own instance, you need to do the following:

1. Get your own [YouTube API Key](https://developers.google.com/youtube/v3/getting-started)
2. Sign up for a free Cloudflare Workers account
3. Create a [new worker](https://cloudflareworkers.com/) and copy the code from `serverless_youtube.js` into the application
4. Insert your YouTube API Key on line 2 in the variable `key`
5. Adjust the `fetch` URL in the React code `src/index.js` on line `111` to your own Worker URL Cloudflare just generated for you
6. You can also uncomment line `37` to enable CORS for your frontend's domain
7. Deploy the worker and the frontend to your host of choice 🎉

## 🙏 Contributing

You can run this project locally by doing the following:

1. Clone the repo `git clone https://github.com/ndom91/youtube-playlists`
2. Install dependencies `cd youtube-playlists && npm install`
3. Start dev server `npm start`
4. Visit `http://localhost:3000`

Please stick to the `prettier` settings when creating a PR.


<p align="center">
    <sub>
        Project by ndom91, released under <a href="https://github.com/ndom91/youtube-playlists/blob/main/LICENSE">MIT license</a>.
    </sub>
</p>
<p align="center">
    <a href="https://twitter.com/ndom91">
        <img alt="Nico Domino on Twitter" src="https://raw.githubusercontent.com/leodr/fill-packagejson/main/assets/twitter.svg">
    </a>
    &nbsp;&nbsp;
    <a href="https://github.com/ndom91">
        <img alt="Nico Domino on GitHub" src="https://raw.githubusercontent.com/leodr/fill-packagejson/main/assets/github.svg">
    </a>
</p>

