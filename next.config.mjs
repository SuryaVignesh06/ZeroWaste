/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/ZeroWaste",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
