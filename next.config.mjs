/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.dummyjson.com'], // Add the external hostname here
  },
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://masline.com https://www.masline.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
