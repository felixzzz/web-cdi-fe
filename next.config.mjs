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
        port: "8001",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8001",
        pathname: "/**",
      },
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

  async redirects() {
    return [
      {
        source: "/:locale/our-business/energy",
        destination: "/:locale/our-business/power",
        permanent: true,
      },
      {
        source: "/our-business/energy",
        destination: "/our-business/power",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://chandradaya-investasi.com https://cdi-be.cmlabs.dev https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com http://localhost:* http://127.0.0.1:*",
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.googletagmanager.com",
              "media-src 'self' https: data: blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://chandradaya-investasi.com",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
