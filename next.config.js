/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "stream": require.resolve("stream-browserify"),
        "stream/web": require.resolve("stream-browserify"),
        "stream-transform": require.resolve("web-streams-polyfill/dist/ponyfill.es2018.js"),
        "web-streams-polyfill": require.resolve("web-streams-polyfill")
      };
    }

    return config;
  }
};

module.exports = nextConfig;
