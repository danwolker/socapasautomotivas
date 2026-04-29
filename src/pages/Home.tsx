import React from 'react';
import Layout from '../layouts/Layout';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import Featured from '../components/Featured';
import Videos from '../components/Videos';
import Bestsellers from '../components/Bestsellers';
import FAQ from '../components/FAQ';

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <TrustStrip />
      <Featured />
      <Videos />
      <Bestsellers />
      <FAQ />
    </Layout>
  );
};

export default Home;
