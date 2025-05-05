import { NextPage } from 'next';
import Head from 'next/head';
import CenteredLogo from '../components/CenteredLogo';
import Hero from '../components/hero/Hero';
import FeaturesSection from '../components/features/FeaturesSection';
import Footer from '../components/layout/Footer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ZeroCard</title>
        <meta name="description" content="Spend crypto like cash with ZeroCard" />
      </Head>
      <div className="min-h-screen flex flex-col p-4 relative">
        <div className="flex-grow">
          <CenteredLogo />
          <Hero />
          <FeaturesSection />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home; 