/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cmlabs-co.s3.ap-southeast-1.amazonaws.com",
        port: "",
      },
      {
        protocol: 'https',
        hostname: 'chandradaya-investasi.com',
        port: '',
        pathname: '/file-storage/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
