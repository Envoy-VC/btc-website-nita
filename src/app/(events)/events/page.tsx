import React from 'react';

import { getAllEvents } from '~/lib/supabase/events';

import { Header } from '~/components';
import EventList from './components/event-list';

const Events = async () => {
  const events = await getAllEvents();
  return (
    <div className='mx-auto w-full max-w-screen-2xl px-2 py-16'>
      <Header title='Events' description='' />
      <EventList serverDetails={events} />
    </div>
  );
};

export default Events;
