import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import Octocat from '@/components/octocat'

export default function Document() {
  const preventDefaultOnDroptarget = (e) => {
    if (e.target.id !== 'droptarget') {
      e.preventDefault()
    }
  }
  return (
    <Html lang="en">
      <Head>
        <title>YouTube | Dynamic Playlists</title>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#3B2667" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Francois+One"
          rel="stylesheet"
        />
        <Script
          data-domain="youtube.ndo.dev"
          src="https://stats.ndo.dev/js/plausible.js"
          strategy="lazyOnload"
        />
      </Head>
      <body
        onDragOver={preventDefaultOnDroptarget}
        onDrop={preventDefaultOnDroptarget}
      >
        <Octocat />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
