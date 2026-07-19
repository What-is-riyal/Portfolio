/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Capital P: GitHub Pages paths are case-sensitive. '/portfolio' 404s every asset.
  // If the repo is ever renamed to what-is-riyal.github.io, delete basePath and assetPrefix.
  basePath: '/Portfolio',
  assetPrefix: '/Portfolio',
  trailingSlash: true,
};

module.exports = nextConfig;
