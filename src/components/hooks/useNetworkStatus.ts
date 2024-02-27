"use client";
import { useState, useEffect } from "react";

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const checkOnlineStatus = async () => {
    try {
      const onlineCheckUrl = "/images/logos/logo-128x128.png"; // Use a small, cacheable image
      const response = await fetch(onlineCheckUrl, { method: "HEAD" });
      setIsOnline(response.ok);
    } catch (error) {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    // Periodically check the online status
    const intervalId = setInterval(checkOnlineStatus, 10000); // Every 10 seconds

    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("online", () => setIsOnline(true));
      window.removeEventListener("offline", () => setIsOnline(false));
    };
  }, []);

  return isOnline;
};
