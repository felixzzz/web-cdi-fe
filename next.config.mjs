/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    // Auto-serve modern formats (AVIF first, then WebP) for better LCP
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/file-storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/assets/frontend/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/file-storage/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/assets/frontend/**",
      },
      {
        protocol: "https",
        hostname: "cmlabs-co.s3.ap-southeast-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "chandradaya-investasi.com",
        port: "",
        pathname: "/file-storage/**",
      },
      {
        protocol: "https",
        hostname: "chandradaya-investasi.com",
        port: "",
        pathname: "/assets/frontend/**",
      },
      {
        protocol: "https",
        hostname: "cdi-be.cmlabs.dev",
        port: "",
        pathname: "/file-storage/**",
      },
      {
        protocol: "https",
        hostname: "cdi-be.cmlabs.dev",
        port: "",
        pathname: "/assets/frontend/**",
      },
      {
        protocol: "https",
        hostname: "nusantaracrocodic.reprime.id",
        port: "",
      },
    ],
  },

  // Tree-shake unused exports from large packages to reduce JS bundle size (INP)
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default withNextIntl(nextConfig);
