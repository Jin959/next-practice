const API_KEY = process.env.API_KEY;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/blog/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
        {
            source: "/api/foods/:uddi",
            destination: encodeURI(`https://api.odcloud.kr/api/15097008/v1/:uddi?serviceKey=${API_KEY}`),
        }
    ]
  },
};

module.exports = nextConfig;
