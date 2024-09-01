"use client";

import { useEffect } from "react";
import useFcmToken from "../hooks/useFcmToken";

const Notifications = () => {
  const { token, notificationPermissionStatus } = useFcmToken();
  console.log(token, notificationPermissionStatus);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((registration) => {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          })
          .catch((err) => {
            console.error("Service Worker registration failed: ", err);
          });
      });
    }
  }, []);
  return <div></div>;
};

export default Notifications;
