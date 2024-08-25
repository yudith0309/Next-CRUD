/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,


  async rewrites() {
    return [
      {
        source: '/users',
        destination: 'http://localhost:8000/user', // Matched parameters can be used in the destination
      },
      {
        source: '/users/:id',
        destination: 'http://localhost:8000/user/:id', // Matched parameters can be used in the destination
      },
    ]
  }

} 

module.exports = nextConfig
