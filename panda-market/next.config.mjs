/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'example.com' },
      { protocol: 'https', hostname: 'placecats.com' },
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      },
      { protocol: 'https', hostname: 'loremflickr.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'no-cdn.shortpixel.ai' },
    ],
  },
}

export default nextConfig
