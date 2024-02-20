import React from 'react';

import Image from 'next/image';

import { HeroBG } from '~/assets';
import { Button } from '../ui/button';
import Link from 'next/link';

import { CardBody, CardContainer, CardItem } from './Card';
import { InfiniteMovingCards } from './InfiniteCards';

const Hero = () => {
  return (
    <div className='relative flex h-screen w-full items-center justify-center'>
      <Image
        src={HeroBG.src}
        alt='Hero background'
        className='h-full w-full object-cover'
        width={1000}
        height={500}
      />
      <div className='absolute top-0 mx-auto flex h-full w-full max-w-screen-md flex-col lg:max-w-screen-xl'>
        <div className='flex h-full w-full flex-col lg:flex-row'>
          <div className='flex h-full w-full basis-1/2 flex-col justify-center gap-4 px-3 py-16'>
            <h1 className='text-5xl font-bold lg:text-7xl'>
              Your gateway to campus events and clubs.
            </h1>
            <h2 className='text-xl text-neutral-600'>
              Stay Informed about Upcoming Events and Club Activities on Campus.
            </h2>
            <div className='flex flex-row items-center gap-2'>
              <Button variant='primary' asChild>
                <Link href='/clubs'>Discover Clubs</Link>
              </Button>
              <Button
                variant='ghost'
                asChild
                className='font-semibold transition-all duration-300 ease-in-out hover:bg-white'
              >
                <Link
                  href='/event'
                  className='group flex flex-row items-center gap-2 '
                >
                  Find New Events
                  <div className='transform transition-transform duration-300 ease-in-out group-hover:translate-x-2'>
                    -&gt;
                  </div>
                </Link>
              </Button>
            </div>
          </div>
          <div className='hidden h-full w-full basis-1/2 items-center justify-center px-6 lg:flex'>
            <CardContainer className='inter-var'>
              <CardBody className='group/card relative h-auto  w-auto rounded-xl border border-black/[0.05] bg-white p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[30rem]  '>
                <CardItem
                  translateZ='50'
                  className='text-xl font-bold text-neutral-900 dark:text-white'
                >
                  Welcome to BTC, Gymkhana Technical
                </CardItem>
                <CardItem
                  as='p'
                  translateZ='60'
                  className='mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300'
                >
                  The Gymkhana Technical Council is the technical body of the
                  NIT Agartala, for students, by students.
                </CardItem>
                <CardItem translateZ='100' className='mt-4 w-full'>
                  <Image
                    src='/api/og'
                    height='1000'
                    width='1000'
                    className='h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl'
                    alt='thumbnail'
                  />
                </CardItem>
                <div className='mt-20 flex items-center justify-between'>
                  <CardItem translateZ={20} as='div'>
                    <Button asChild variant='ghost'>
                      <Link href='/events'>Explore</Link>
                    </Button>
                  </CardItem>
                  <CardItem translateZ={20} as='div'>
                    <Button asChild>
                      <Link href='/sign-n'>Get Started</Link>
                    </Button>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </div>
        </div>
        <InfiniteMovingCards
          items={testimonials}
          direction='right'
          speed='slow'
        />
      </div>
    </div>
  );
};

const testimonials = [
  {
    quote:
      'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.',
    name: 'Charles Dickens',
    title: 'A Tale of Two Cities',
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: 'William Shakespeare',
    title: 'Hamlet',
  },
  {
    quote: 'All that we see or seem is but a dream within a dream.',
    name: 'Edgar Allan Poe',
    title: 'A Dream Within a Dream',
  },
  {
    quote:
      'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
    name: 'Jane Austen',
    title: 'Pride and Prejudice',
  },
  {
    quote:
      'Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.',
    name: 'Herman Melville',
    title: 'Moby-Dick',
  },
];

export default Hero;
