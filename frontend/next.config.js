/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    REACT_APP_URL_BASE:process.env.REACT_APP_URL_BASE
  }
}
