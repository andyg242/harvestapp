/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:
          [{
            protocol: 'https',
            hostname: 'images.unsplash.com',
          }, {
            protocol: 'https',
            hostname: 'plus.unsplash.com',
          }, {
            protocol: 'https',
            hostname: 'f.nooncdn.com',
            pathname: '/en/women/**'
          }, {
            protocol: 'https',
            hostname: 'picsum.photos',
          }],
      },
};

export default nextConfig;
