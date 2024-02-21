importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js"
);
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
workbox.precaching.precacheAndRoute([
  { url: "/offline", revision: 31 },
  { url: "/", revision: 31 },
  { url: "/home", revision: 31 },
  { url: "/lists/create-list", revision: 31 },
]);

// if (workbox) {
// workbox.routing.registerRoute(
//   ({ url, request }) => request.mode === "navigate",
//   new workbox.strategies.NetworkFirst({
//     cacheName: "pages-cache",
//     plugins: [
//       new workbox.cacheableResponse.CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 30 * 24 * 60 * 60,
//       }),
//     ],
//   })
// {
//   ignoreURLParametersMatching: [/^_rsc$/],
// }
// );
workbox.routing.registerRoute(
  ({ request }) => request.destination === "font",
  new workbox.strategies.CacheFirst({
    cacheName: "font-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        maxEntries: 30,
      }),
    ],
  })
);
workbox.routing.registerRoute(
  ({ request }) => ["style", "script", "image"].includes(request.destination),
  new workbox.strategies.CacheFirst({
    cacheName: "assets-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100, // Adjust based on your needs
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);
// workbox.routing.registerRoute(
//   new RegExp("https://stingray-app-69yxe.ondigitalocean.app/.*"),
//   new workbox.strategies.NetworkFirst({
//     cacheName: "backend-api-cache",
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   })
// );
// workbox.routing.registerRoute(
//   new RegExp("http://localhost:8000/api/"),
//   new workbox.strategies.NetworkFirst({
//     cacheName: "api-cache-dev",
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   })
// );
workbox.routing.setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case "document":
      return caches.match("/offline");
      break;
    case "image":
      return caches.match("/images/logos/logo-96x96.png");
      break;
    default:
      // If we don't have a fallback, just return an error response.
      return Response.error();
  }
});

// Use self instead of window for service workers
self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("Service Worker installing.");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
  event.waitUntil(clients.claim());
});

// Basic fetch event logging
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate" && event.request.url.endsWith("/")) {
    // Respond with a redirect to /home
    event.respondWith(
      Response.redirect(new URL("/home", event.request.url).href)
    );
    return;
  }
  console.log("fetching", event.request.url);
});
