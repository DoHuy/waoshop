/** @type {import('next').NextConfig} */
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { i18n } = require('./i18n/i18n.config.js');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'dropshipbe.c9d03a66f0127f656366a6df5069fa51.r2.cloudflarestorage.com',
        pathname: '/**',
      },
    ],

    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;