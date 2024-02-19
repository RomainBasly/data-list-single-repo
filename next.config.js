// // @ts-check
// const {
//   PHASE_DEVELOPMENT_SERVER,
//   PHASE_PRODUCTION_BUILD,
// } = require("next/constants");

// /** @type {import("next").NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = (phase) => {
//   if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
//     const withPWA = require("@ducanh2912/next-pwa").default({
//       dest: "public",
//       // dynamicStartUrlRedirect: "/home",
//       // cacheOnFrontEndNav: true,
//       // cacheStartUrl: true,
//       customWorkerSrc: "swInit.js",
//       // fallbacks: {
//       //   document: "/offline",
//       // },
//       // sw: "sw.js",
//       // register: true,
//       // reloadOnOnline: true,
//     });

//     return withPWA(nextConfig);
//   }
//   return nextConfig;
// };
