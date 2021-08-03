import Head from 'next/head'
import './index.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>YouTube | Dynamic Playlists</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
