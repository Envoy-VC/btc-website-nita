/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

import withPWA from 'next-pwa';

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'svofmwoukzjgqheplyds.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn1.iconfinder.com',
      },
    ],
  },
};

const withNextPWA = withPWA({
  dest: 'public',
});

// @ts-expect-error error
export default withNextPWA(config);
