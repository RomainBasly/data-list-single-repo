if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,t)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let i={};const r=e=>c(e,n),o={module:{uri:n},exports:i,require:r};s[n]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(t(...e),i)))}}define(["./workbox-0ea65fa9"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/19l0_cRJyCemo9ewyhDUX/_buildManifest.js",revision:"a1b7599199e2e8c82f2c6bcf8d8aca61"},{url:"/_next/static/19l0_cRJyCemo9ewyhDUX/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/149-353286bdeefa6617.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/352-cfb985b51618df54.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/378-33444403a935fc9f.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/523-47ef7cb212dbfd0c.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/629-9445d2610401c564.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/686-9ccc11386dc1fe4d.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/app/_not-found-8373df3becb266f2.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/app/faq/page-54f49bcd399ec657.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/app/home/page-fd7ca53d877129c1.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/app/layout-8153074224ef7f8d.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/app/lists/create-list/page-67442dfdf09aaf53.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/app/login/page-fdd2de5e8fcb1207.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/app/page-af93661906de74d0.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/app/profile/page-b16da572e0dcb562.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/app/register/add-password/page-08ba4c3d04b6f5fc.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/app/register/page-c54b7ce4b1b6a1cb.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/app/register/verify-code/page-32a008bca3730b2a.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/app/transition/page-0941c5ed9433effd.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/fd9d1056-8057e7accfe6c0f7.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/main-759d990c9fef7631.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/main-app-caf6a3ae7944d61b.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/pages/_app-98cb51ec6f9f135f.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/pages/_error-e87e5963ec1b8011.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-81fbc08c59d155a4.js",revision:"19l0_cRJyCemo9ewyhDUX"},{url:"/_next/static/css/30a186a48c97c298.css",revision:"30a186a48c97c298"},{url:"/_next/static/css/6a57e5899318c4cf.css",revision:"6a57e5899318c4cf"},{url:"/_next/static/css/7099661898ca9b12.css",revision:"7099661898ca9b12"},{url:"/_next/static/css/bbc3111ca3bbcb07.css",revision:"bbc3111ca3bbcb07"},{url:"/_next/static/css/cd8a23f984cbcbe3.css",revision:"cd8a23f984cbcbe3"},{url:"/_next/static/css/de4fb881fdbf53d3.css",revision:"de4fb881fdbf53d3"},{url:"/_next/static/css/e0126fd8bb332c2e.css",revision:"e0126fd8bb332c2e"},{url:"/_next/static/css/f7442b6ffcbea0af.css",revision:"f7442b6ffcbea0af"},{url:"/_next/static/css/f860ce90d4a66d44.css",revision:"f860ce90d4a66d44"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/media/logo-256x256.fc339c62.png",revision:"96aee0d318181e700641226d56a4da98"},{url:"/_next/static/media/logo-big-screen.a314d65c.png",revision:"690710958463fad1adfe0eb649f262ee"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:c})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&c&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:c})=>"1"===e.headers.get("RSC")&&c&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
