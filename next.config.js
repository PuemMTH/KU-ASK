/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    'MYKU_APPKEY': 'puem.codes',
  }
}

module.exports = nextConfig
