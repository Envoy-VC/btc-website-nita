'use client';

import React from 'react';

import { Input } from '~/components/ui/input';

const SearchBox = () => {
  return (
    <Input
      placeholder='Search'
      className='hidden w-full max-w-sm rounded-xl md:block'
    />
  );
};

export default SearchBox;
