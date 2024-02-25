import React from 'react';

import { FeaturedEvents, Footer, Hero, Navbar } from '~/components';
import MobileNavbar from './(user)/components/sidebar/mobile';

import { homePageItems as items } from '~/lib/data';

const Home = () => {
  return (
    <div>
      <MobileNavbar items={items} />
      <div className='hidden lg:flex'>
        <Navbar />
      </div>
      <Hero />
      <FeaturedEvents />
      <Footer />
    </div>
  );
};

export default Home;
