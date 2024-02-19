importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js"
);

if (workbox) {
  workbox.precaching.precacheAndRoute([
    { url: "/", revision: "15" },
    // Add other assets here
  ]);

  workbox.routing.registerRoute(
    // Match JavaScript files hosted on a CDN
    new RegExp(
      "https://storage.googleapis.com/workbox-cdn/releases/.*/.*\\.js"
    ),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "google-workbox",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 20, // Limit the number of entries in the cache
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({ request }) => request.mode === "navigate",
    new workbox.strategies.NetworkFirst({
      cacheName: "pages-cache",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50, // Adjust based on your needs
          purgeOnQuotaError: true, // Automatically purge caches if quota is exceeded
        }),
      ],
    })
  );

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
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "assets-cache",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100, // Adjust based on your needs
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp("https://stingray-app-69yxe.ondigitalocean.app/.*"),
    new workbox.strategies.NetworkFirst({
      cacheName: "backend-api-cache",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );
  workbox.routing.registerRoute(
    new RegExp("http://localhost:8000/api/"),
    new workbox.strategies.NetworkFirst({
      cacheName: "api-cache-dev",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );
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
}

// Use self instead of window for service workers
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open("my-app-cache").then((cache) => {
      return cache.addAll([
        "/manifest.json", // Add manifest.json to the list of files to cache
        // List other assets here
      ]);
    })
  );
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
