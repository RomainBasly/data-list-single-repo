const withPWA = require("@ducanh2912/next-pwa");
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// module.exports = (phase) => {
//   if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
//     const withPWA = require("@ducanh2912/next-pwa").default({
//       dest: "public",
//       runtimeCaching: [
//         {
//           urlPattern: /\/api\/auth\//, // Regex for your authentication endpoints
//           handler: 'NetworkOnly', // Use NetworkOnly strategy for these endpoints
//         },
//       ]
//     });
//     return withPWA(nextConfig);
//   }
//   return nextConfig;
// };

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    return withPWA({
      dest: "public",
      runtimeCaching: [
        {
          urlPattern: /\/api\/auth\//, // Regex for your authentication endpoints
          handler: 'NetworkOnly', // Use NetworkOnly strategy for these endpoints
        },
        // ... other runtime caching configurations
      ],
      ...nextConfig, // Spread the existing nextConfig
    });
  }
  return nextConfig;
};