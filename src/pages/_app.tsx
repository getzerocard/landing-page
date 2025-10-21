import '../styles/global.css';
import type { AppProps } from 'next/app';
import { SquircleNoScript } from '@squircle-js/react';
import Head from 'next/head';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Font loading optimization
    if ('fonts' in document) {
      // Check if fonts are loaded and add class to prevent FOUT
      Promise.all([
        document.fonts.load('400 16px "SF Pro Display"'),
        document.fonts.load('500 16px "SF Pro Display"'),
        document.fonts.load('600 16px "SF Pro Display"'),
        document.fonts.load('700 16px "SF Pro Display"'),
      ]).then(() => {
        document.documentElement.classList.add('fonts-loaded');
      }).catch(() => {
        // Fallback: add class after timeout
        setTimeout(() => {
          document.documentElement.classList.add('fonts-loaded');
        }, 100);
      });
    } else {
      // Fallback for browsers without Font Loading API
      setTimeout(() => {
        document.documentElement.classList.add('fonts-loaded');
      }, 100);
    }
  }, []);

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
