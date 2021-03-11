// https://nextjs.org/learn/basics/assets-metadata-css/global-styles
// this is top-level component
// use it for global CSS files (you can't import it anywhere else),
// to keep state when navigating between pages

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
