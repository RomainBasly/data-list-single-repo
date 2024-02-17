// swInit.js - Located in your public directory

// Use self instead of window for service workers
self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
});

// Basic fetch event logging
self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
});
