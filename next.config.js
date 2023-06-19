/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Add the polyfill to the client-side webpack config
        if (!isServer) {
          config.resolve.fallback = {
            ...config.resolve.fallback,
            "stream": require.resolve("stream-browserify"),
            "stream/web": require.resolve("stream-browserify"),
            "stream-transform": require.resolve("web-streams-polyfill/dist/ponyfill.es2018.js"),
          };
        }
    
        return config;
    }
}

module.exports = nextConfig
