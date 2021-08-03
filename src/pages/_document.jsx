import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import Octocat from '@/components/octocat'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charset="utf-8" />
          <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="theme-color" content="#3B2667" />
          <link
            href="https://fonts.googleapis.com/css2?family=Francois+One"
            rel="stylesheet"
          />

          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
          <script
            async
            defer
            data-domain="youtube.ndo.dev"
            src="https://stats.ndo.dev/js/plausible.js"
          ></script>

          {/* <title>YouTube | Dynamic Playlists</title> */}
        </Head>
        <body>
          <Octocat />
          <Main />
          <NextScript />
        </body>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
          window.addEventListener(
            "dragover",
            function(e) {
              e = e || event;
              if (e.target.id != "droptarget") {
                // check which element is our target
                e.preventDefault();
              }
            },
            false
          );

          window.addEventListener(
            "drop",
            function(e) {
              e = e || event;
              if (e.target.id != "droptarget") {
                // check which element is our target
                e.preventDefault();
              }
            },
            false
          );
    `,
          }}
        />
      </Html>
    )
  }
}

export default MyDocument
