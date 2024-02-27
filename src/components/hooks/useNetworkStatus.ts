"use client";
import { useState, useEffect } from "react";

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const checkOnlineStatus = async () => {
    // Use a URL that you expect to be always available and responds quickly
    const onlineCheckUrl = "/images/logos/logo-128x128.png"; // Using favicon as it's typically small and always present
    try {
      // Attempt to fetch with cache bypass to ensure live status
      const response = await fetch(onlineCheckUrl, {
        method: "HEAD",
        cache: "no-cache",
      });
      setIsOnline(response.ok);
    } catch (error) {
      // If fetch fails, network might be down
      setIsOnline(false);
    }
  };

  useEffect(() => {
    // Set an interval for periodic network status checks
    const intervalId = setInterval(checkOnlineStatus, 5000); // Check every 10 seconds

    // Perform an immediate check on mount
    checkOnlineStatus();

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Handler for receiving messages
    const handleServiceWorkerMessage = (event: {
      data: {
        isOnline: boolean | ((prevState: boolean) => boolean) | undefined;
      };
    }) => {
      if (event.data.isOnline !== undefined) {
        setIsOnline(event.data.isOnline);
      }
    };

    // Add event listener for messages from service worker
    navigator.serviceWorker.addEventListener(
      "message",
      handleServiceWorkerMessage
    );

    // Cleanup
    return () =>
      navigator.serviceWorker.removeEventListener(
        "message",
        handleServiceWorkerMessage
      );
  }, []);

  return isOnline;
};
