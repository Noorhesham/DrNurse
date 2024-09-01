import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL3AouHec0aKu3SzgtQ2YjtTtNvAaJudA",
  authDomain: "react-6bd52.firebaseapp.com",
  projectId: "react-6bd52",
  storageBucket: "react-6bd52.appspot.com",
  messagingSenderId: "453925556171",
  appId: "1:453925556171:web:a3801d8bd6e7283593304e",
  measurementId: "G-EK136EZXQV",
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
        vapidKey: "BN6WAOKbpbGGnhCHXisFDt8AIBUDRldWnK6jMegDHkjwTtK7W2fRZEf843QFKLmxjX4-BmZZ5XvERKuwEDt2qXM",
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
