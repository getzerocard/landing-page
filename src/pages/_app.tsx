import '../styles/global.css';
import type { AppProps } from 'next/app';
import { SquircleNoScript } from '@squircle-js/react';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta property="og:image" content="/ogimage.png" />
        {/* You might want to add other default OG tags here too */}
        {/* e.g., <meta property="og:title" content="Your Site Title" /> */}
        {/* <meta property="og:description" content="Your site description" /> */}
      </Head>
      <SquircleNoScript />
      <Component {...pageProps} />
    </>
  );
}
