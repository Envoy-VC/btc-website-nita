import React from 'react';

import { Hero, Navbar } from '~/components';
import MobileNavbar from './(user)/components/sidebar/mobile';

import { homePageItems as items } from '~/lib/data';

const Home = () => {
  return (
    <div>
      <MobileNavbar items={items} />
      <div className='hidden lg:flex'>
        <Navbar />
      </div>
      <div className='py-[4.4rem] lg:py-0'>
        <Hero />
      </div>
    </div>
  );
};

export default Home;
