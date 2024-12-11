import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYIaGc1S7xRaAC9s925_6FN5GBoiYoEi8",
  authDomain: "scoial-login-test.firebaseapp.com",
  projectId: "scoial-login-test",
  storageBucket: "scoial-login-test.firebasestorage.app",
  messagingSenderId: "169006394731",
  appId: "1:169006394731:web:5eeb4b967eb6879cc1302e",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: "BMLTgi47557eie2mwKxN09ie6GRJ2mXASUMa-EKkfBjNUMCy24zjWbVS0b70td2q8ChApAqXVh0laas6lwWYano",
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
