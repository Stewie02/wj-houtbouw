const checkEnvVariables = require("./check-env-variables");

checkEnvVariables();

/**
 * Medusa Cloud-related environment variables
 */
const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME;
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME;

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      { source: "/winkel", destination: "/store" },
      { source: "/over-ons", destination: "/about" },
      { source: "/veelgestelde-vragen", destination: "/faq" },
      { source: "/cookiebeleid", destination: "/cookie-policy" },
      { source: "/algemene-voorwaarden", destination: "/terms-and-conditions" },
      { source: "/producten/:handle", destination: "/products/:handle" },
      { source: "/winkelwagen", destination: "/cart" },
      { source: "/afrekenen", destination: "/checkout" },
      { source: "/collecties/:handle", destination: "/collections/:handle" },
      { source: "/categorieen/:path*", destination: "/categories/:path*" },
      {
        source: "/bestelling/:id/bevestigd",
        destination: "/order/:id/confirmed",
      },
      {
        source: "/bestelling/:id/overdracht/:token/accepteren",
        destination: "/order/:id/transfer/:token/accept",
      },
      {
        source: "/bestelling/:id/overdracht/:token/weigeren",
        destination: "/order/:id/transfer/:token/decline",
      },
      {
        source: "/bestelling/:id/overdracht/:token",
        destination: "/order/:id/transfer/:token",
      },
      { source: "/account/profiel", destination: "/account/profile" },
      { source: "/account/adressen", destination: "/account/addresses" },
      {
        source: "/account/bestellingen/details/:id",
        destination: "/account/orders/details/:id",
      },
      { source: "/account/bestellingen", destination: "/account/orders" },
    ];
  },
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
      },
      ...(S3_HOSTNAME && S3_PATHNAME
        ? [
            {
              protocol: "https",
              hostname: S3_HOSTNAME,
              pathname: S3_PATHNAME,
            },
          ]
        : []),
    ],
  },
};

module.exports = nextConfig;
