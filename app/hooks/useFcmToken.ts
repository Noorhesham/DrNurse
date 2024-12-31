"use client";

import { useEffect, useRef, useState } from "react";
import { getToken, onMessage, Unsubscribe } from "firebase/messaging";
import { useRouter } from "next/navigation";
import { fetchToken, messaging } from "@/firebase";
import { toast } from "react-toastify";

async function getNotificationPermissionAndToken() {
  // Step 1: Check if Notifications are supported in the browser.
  if (!("Notification" in window)) {
    console.info("This browser does not support desktop notifications");
    return null;
  }

  // Step 2: Check if permission is already granted.
  if (Notification.permission === "granted") {
    return await fetchToken();
  }

  // Step 3: If permission is not denied, request permission from the user.
  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      return await fetchToken();
    }
  }

  console.log("Notification permission not granted.");
  return null;
}
function stripHtmlTags(str: string) {
  return str.replace(/<[^>]*>/g, "");
}

const useFcmToken = () => {
  const router = useRouter(); // Initialize the router for navigation.
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission | null>(null); // State to store the notification permission status.
  const [token, setToken] = useState<string | null>(null); // State to store the FCM token.
  const retryLoadToken = useRef(0); // Ref to keep track of retry attempts.
  const isLoading = useRef(false); // Ref to keep track if a token fetch is currently in progress.
  const listenerRegistered = useRef(false);
  const unsubscribeFromNotifications = async () => {
    const m = await messaging();
    if (!m) return;

    // Unregister service worker listeners
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });

    setToken(null); // Reset token
  };
  const loadToken = async () => {
    // Step 4: Prevent multiple fetches if already fetched or in progress.
    if (isLoading.current) return;

    isLoading.current = true; // Mark loading as in progress.
    const token = await getNotificationPermissionAndToken(); // Fetch the token.

    // Step 5: Handle the case where permission is denied.
    if (Notification.permission === "denied") {
      setNotificationPermissionStatus("denied");
      console.info(
        "%cPush Notifications issue - permission denied",
        "color: green; background: #c7c7c7; padding: 8px; font-size: 20px"
      );
      isLoading.current = false;
      return;
    }

    // Step 6: Retry fetching the token if necessary. (up to 3 times)
    if (!token) {
      if (retryLoadToken.current >= 3) {
        alert("Unable to load token, refresh the browser");
        console.info(
          "%cPush Notifications issue - unable to load token after 3 retries",
          "color: green; background: #c7c7c7; padding: 8px; font-size: 20px"
        );
        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      console.error("An error occurred while retrieving token. Retrying...");
      isLoading.current = false;
      await loadToken(); // Recursive call to retry fetching token.
      return;
    }

    // Step 7: Set the fetched token and mark as fetched.
    setNotificationPermissionStatus(Notification.permission);
    setToken(token);
    isLoading.current = false;
  };

  useEffect(() => {
    // Step 8: Initialize token loading when the component mounts.
    if ("Notification" in window) {
      loadToken();
    }
  }, []);

  useEffect(() => {
    const setupListener = async () => {
      if (!token) return; // Exit if no token is available.
      if (listenerRegistered.current) return; // Avoid duplicate listeners

      console.log(`onMessage registered with token ${token}`);
      const m = await messaging();
      if (!m) return;
      listenerRegistered.current = true;
      // Step 9: Register a listener for incoming FCM messages.
      const unsubscribe = onMessage(m, (payload) => {
        console.log(Notification.permission);
        if (Notification.permission !== "granted") return;

        console.log("Foreground push notification received:", Notification);

        // Sanitize title and body
        const title = stripHtmlTags(payload.notification?.title || "New message");
        const body = stripHtmlTags(payload.notification?.body || "This is a new message");

        const link = payload.fcmOptions?.link || payload.data?.link;

        // Show native browser notification
        const n = new Notification(title, {
          body,
          data: link ? { url: link } : undefined,
        });

        // Handle notification click event
        n.onclick = (event) => {
          event.preventDefault();
          const link = (event.target as any)?.data?.url;
          if (link) {
            router.push(link);
          } else {
            console.log("No link found in the notification payload");
          }
        };

        // Show toast notification
        toast(`${title}: ${body}`, {
          onClick: () => {
            if (link) {
              router.push(link);
            }
          },
          autoClose: 10000, // Keep toast visible for 10 seconds
          closeOnClick: true,
          pauseOnHover: true, // Allow hover to pause the timer
        });

        // If the tab is inactive, ensure the native notification grabs the user's attention
        if (document.hidden && Notification.permission === "granted") {
          n.onclick = () => {
            window.focus();
            if (link) {
              router.push(link);
            }
          };
        }
      });

      return unsubscribe;
    };
    let unsubscribe: Unsubscribe | null = null;

    setupListener().then((unsub) => {
      if (unsub) {
        unsubscribe = unsub;
      }
    });

    // Step 11: Cleanup the listener when the component unmounts.
    return () => {
      listenerRegistered.current = false; // Reset on unmount
      unsubscribe?.();
    };
  }, [token, router]);

  return { token, notificationPermissionStatus, unsubscribeFromNotifications }; // Return the token and permission status.
};

export default useFcmToken;
