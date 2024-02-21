'use client';

import React, { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';

import LoadingSpinner from '../loading-spinner';

const AddToMobile = dynamic(() => import('../add-to-home'), {
  loading: () => <LoadingSpinner />,
});

import useUserAgent from '~/lib/hooks/useUserAgent';
import type { BeforeInstallPromptEvent } from '~/types';

type AddToHomeScreenPromptType =
  | 'safari'
  | 'chrome'
  | 'firefox'
  | 'other'
  | 'firefoxIos'
  | 'chromeIos'
  | 'samsung'
  | '';
const COOKIE_NAME = 'addToHomeScreenButton';

export default function AddToHomeScreen() {
  const [displayPrompt, setDisplayPrompt] =
    useState<AddToHomeScreenPromptType>('');
  const { userAgent, isMobile, isStandalone, isIOS } = useUserAgent();

  const [pwaPrompt, setPwaPrompt] =
    React.useState<BeforeInstallPromptEvent | null>(null);

  const closePrompt = () => {
    setDisplayPrompt('');
  };

  const doNotShowAgain = () => {
    // Create date 30 days from now
    const date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    setCookie(COOKIE_NAME, 'dontShow', { expires: date }); // Expires in 30 days
    setDisplayPrompt('');
  };

  useEffect(() => {
    const addToHomeScreenButtonCookie = getCookie(COOKIE_NAME);

    if (isMobile && addToHomeScreenButtonCookie !== 'dontShow') {
      // Only show prompt if user is on mobile and app is not installed
      if (!isStandalone) {
        if (userAgent === 'Safari') {
          setDisplayPrompt('safari');
        } else if (userAgent === 'Chrome') {
          setDisplayPrompt('chrome');
        } else if (userAgent === 'Firefox') {
          setDisplayPrompt('firefox');
        } else if (userAgent === 'FirefoxiOS') {
          setDisplayPrompt('firefoxIos');
        } else if (userAgent === 'ChromeiOS') {
          setDisplayPrompt('chromeIos');
        } else if (userAgent === 'SamsungBrowser') {
          setDisplayPrompt('samsung');
        } else {
          setDisplayPrompt('other');
        }
      }
    } else {
    }
  }, [userAgent, isMobile, isStandalone, isIOS]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPwaPrompt(e as unknown as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const onClick = async () => {
    if (pwaPrompt) {
      void pwaPrompt.prompt();
    }
  };

  return (
    <>
      {displayPrompt !== '' && pwaPrompt ? (
        <AddToMobile
          closePrompt={closePrompt}
          doNotShowAgain={doNotShowAgain}
          onClick={onClick}
        />
      ) : (
        <></>
      )}
    </>
  );
}
