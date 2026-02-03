import { NextPage } from 'next';
import Head from 'next/head';
import CenteredLogo from '../components/CenteredLogo';
import Hero from '../components/hero/Hero';
import FeaturesSection from '../components/features/FeaturesSection';
import Footer from '../components/layout/Footer';
import CookieConsent from '../components/cookie/CookieConsent';

const Home: NextPage = () => {
  const handleDownloadApp = () => {
    window.open('https://onelink.to/93sv9q', '_blank');
  };

  return (
    <>
      <Head>
        <title>Zerocard</title>
        <meta name="description" content="Spend crypto like cash with Zerocard" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@GETZEROCARD" />
        <meta name="twitter:title" content="Zerocard | Spend Crypto & Move Money for Less" />
        <meta name="twitter:description" content="Spend and transfer crypto and Naira locally and globally with Zerocard. Enjoy borderless payments, zero hidden fees, and instant transfers anywhere in the world." />
        <meta name="twitter:image" content="https://res.cloudinary.com/dvj8mizva/image/upload/v1770117037/thumbnail_mpzmim.jpg" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Zerocard | Spend Crypto & Move Money for Less" />
        <meta property="og:description" content="Spend and transfer crypto and Naira locally and globally with Zerocard." />
        <meta property="og:image" content="https://res.cloudinary.com/dvj8mizva/image/upload/v1770117037/thumbnail_mpzmim.jpg" />
      </Head>
      <div className="min-h-screen flex flex-col px-4 sm:px-6 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#40FF00] rounded-full filter blur-[100px] opacity-15 animate-blob"></div>
        </div>

        <div className="flex-grow relative z-10 flex flex-col">
          <CenteredLogo />
          <Hero onDownloadAppClick={handleDownloadApp} />
          <FeaturesSection />
        </div>
        <Footer />
      </div>
      <CookieConsent />
    </>
  );
};

export default Home; 