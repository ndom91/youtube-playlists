import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import Octocat from '@/components/octocat'

export default class MyDocument extends Document {
  render() {
    const preventDefaultOnDroptarget = (e) => {
      if (e.target.id !== 'droptarget') {
        e.preventDefault()
      }
    }
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="theme-color" content="#3B2667" />
          <link
            href="https://fonts.googleapis.com/css2?family=Francois+One"
            rel="stylesheet"
          />
          <script
            async
            defer
            data-domain="youtube.ndo.dev"
            src="https://stats.ndo.dev/js/plausible.js"
          ></script>
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
}
