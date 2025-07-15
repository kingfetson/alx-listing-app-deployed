// next.config.js
module.exports = {
  // ... other config
  images: {
    domains: ['example.com'],
  },
  // For local HTTPS
  devIndicators: {
    autoPrerender: false,
  },
}