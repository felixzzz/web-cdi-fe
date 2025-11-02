/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
     dangerouslyAllowSVG: true,
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
      {
        protocol: 'https',
        hostname: 'chandradaya-investasi.com',
        port: '',
        pathname: '/assets/frontend/**',
      },
      {
        protocol: 'https',
        hostname: 'nusantaracrocodic.reprime.id',
        port: '',
        // pathname: '/assets/frontend/**',
      },
    ],
    // dangerouslyAllowSVG       : true,
  },
};

export default withNextIntl(nextConfig);
