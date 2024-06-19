/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
});

const nextConfig = {
  output: 'standalone',

  reactStrictMode: true,

  productionBrowserSourceMaps: false,
};

export default process.env.NODE_ENV === 'production'
  ? withPWA(nextConfig)
  : nextConfig;
