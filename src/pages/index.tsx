import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import CenteredLogo from '../components/CenteredLogo';
import Hero from '../components/hero/Hero';
import FeaturesSection from '../components/features/FeaturesSection';
import Footer from '../components/layout/Footer';
import { ReserveCardButton } from '@/components/buttons/Button';
import { ReserveCardModal } from '@/components/popups/ReserveCardModal';

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
        <title>ZeroCard</title>
        <meta name="description" content="Spend crypto like cash with ZeroCard" />
      </Head>
      <div className="min-h-screen flex flex-col p-4 relative">
        <div className="flex-grow">
          <CenteredLogo />
          <Hero onReserveCardClick={handleOpenModal} />
          <FeaturesSection />
        </div>
        <Footer />
      </div>
      <ReserveCardModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Home; 