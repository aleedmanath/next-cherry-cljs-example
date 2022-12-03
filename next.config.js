const { withClojurescript } = require('./loader/next-plugin')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
  }
}

module.exports = withClojurescript(nextConfig)
