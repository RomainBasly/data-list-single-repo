// "use client";
// import { useState, useEffect } from "react";

// export const useNetworkStatus = () => {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   const checkOnlineStatus = async () => {
//     try {
//       const onlineCheckUrl = "/images/logos/logo-128x128.png"; // Use a small, cacheable image
//       const response = await fetch(onlineCheckUrl, { method: "HEAD" });
//       setIsOnline(response.ok);
//     } catch (error) {
//       setIsOnline(false);
//     }
//   };

//   useEffect(() => {
//     // Periodically check the online status
//     const intervalId = setInterval(checkOnlineStatus, 10000); // Every 10 seconds

//     window.addEventListener("online", () => setIsOnline(true));
//     window.addEventListener("offline", () => setIsOnline(false));

//     return () => {
//       clearInterval(intervalId);
//       window.removeEventListener("online", () => setIsOnline(true));
//       window.removeEventListener("offline", () => setIsOnline(false));
//     };
//   }, []);

//   return isOnline;
// };
"use client";
import { useState, useEffect } from "react";

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const checkOnlineStatus = async () => {
    if (!navigator.onLine) {
      setIsOnline(false);
      return; // If navigator.onLine is false, no need to check further
    }
    // Attempt to fetch a small resource. Adjust the URL to a suitable endpoint on your server or a small image
    try {
      const onlineCheckUrl = "/images/logos/logo-128x128.png"; // Use a small, cacheable image
      const response = await fetch(onlineCheckUrl, {
        method: "HEAD",
        cache: "no-cache",
      });
      setIsOnline(response.ok);
    } catch (error) {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalId); // Reduce checks when the page is not visible
      } else {
        clearInterval(intervalId); // Clear existing interval to avoid duplicates
        intervalId = setInterval(checkOnlineStatus, 10000); // Adjust to 10 seconds or another suitable value
      }
    };

    // Initial check and set up interval
    checkOnlineStatus();
    intervalId = setInterval(checkOnlineStatus, 5000); // Every 10 seconds

    // Adjust check frequency based on page visibility to save resources
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up
    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isOnline;
};
