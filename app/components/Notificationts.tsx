"use client";

import { useEffect } from "react";
import useFcmToken from "../hooks/useFcmToken";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { Server } from "../main/Server";
import { useDevice } from "../context/DeviceContext";

const Notifications = () => {
  const { token, notificationPermissionStatus } = useFcmToken();
  const [notificationToken, setNotificationToken] = useLocalStorageState("", "notificationToken", true);
  console.log("notificationToken", notificationToken, token);
  const { device_info } = useDevice();
  const updateNotificationToken = async () => {
    const res = await Server({
      resourceName: "notificationToken",
      body: {
        key: "notification_token",
        value: token,
        device_info,
        action: "set",
      },
    });
    console.log(res);
  };
  useEffect(() => {
    console.log("Current tokens:", { notificationToken, token });
    //syncing the states and i have to wait for notifiaction token to fetch its initial value from local storage
    if (token && token !== notificationToken) {
      console.log("Seeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeetting new notification token");
      setNotificationToken(token);
      updateNotificationToken();
    }
  }, [token, notificationToken]); // Add notificationToken as dependency

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
