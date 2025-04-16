"use client";

import { useEffect, useState } from "react";
import useFcmToken from "../hooks/useFcmToken";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { Server } from "../main/Server";
import { useDevice } from "../context/DeviceContext";
import { useGetEntity } from "@/lib/queries";

const Notifications = () => {
  const { token, notificationPermissionStatus } = useFcmToken();
  const [notificationToken, setNotificationToken] = useLocalStorageState("", "notificationToken", true);
  const [deviceData, setDeviceData] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getDeviceData = async () => {
      const res = await Server({
        resourceName: "languageUpdate",
        body: {
          action: "get",
          device_info,
        },
      });
      setDeviceData(res?.device.notification_token);
      setLoading(false);
    };
    getDeviceData();
  }, []);
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
  };
  useEffect(() => {
    console.log("Current tokens:", { notificationToken, token });
    //syncing the states and i have to wait for notifiaction token to fetch its initial value from local storage
    // token !== notificationToken &&
    console.log(token, deviceData);
    if (token && !deviceData && !loading) {
      setNotificationToken(token);
      updateNotificationToken();
    }
  }, [token, notificationToken, loading]); // Add notificationToken as dependency

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
