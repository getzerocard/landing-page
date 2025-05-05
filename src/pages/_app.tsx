import '../styles/global.css';
import type { AppProps } from 'next/app';
import { SquircleNoScript } from '@squircle-js/react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SquircleNoScript />
      <Component {...pageProps} />
    </>
  );
}
