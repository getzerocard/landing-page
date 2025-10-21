import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import CenteredLogo from '../components/CenteredLogo';
import Hero from '../components/hero/Hero';
import FeaturesSection from '../components/features/FeaturesSection';
import Footer from '../components/layout/Footer';
import { ReserveCardModal } from '@/components/popups/ReserveCardModal';
import CookieConsent from '../components/cookie/CookieConsent';

const Home: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>Zerocard</title>
        <meta name="description" content="Spend crypto like cash with Zerocard" />
      </Head>
      <div className="min-h-screen flex flex-col px-4 sm:px-6 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#40FF00] rounded-full filter blur-[100px] opacity-15 animate-blob"></div>
        </div>
        
        <div className="flex-grow relative z-10 flex flex-col">
          <CenteredLogo />
          <Hero onReserveCardClick={handleOpenModal} />
          <FeaturesSection />
        </div>
        <Footer />
      </div>
      <ReserveCardModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <CookieConsent />
    </>
  );
};

export default Home; 