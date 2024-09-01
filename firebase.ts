import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp-Tn74eshiw5wCVNfksVFM96_bW0TWOg",
  authDomain: "drnurse-817f4.firebaseapp.com",
  projectId: "drnurse-817f4",
  storageBucket: "drnurse-817f4.appspot.com",
  messagingSenderId: "651306014180",
  appId: "1:651306014180:web:8c5bd34ee57f0a6dac63f1",
  measurementId: "G-8YVP1MFJNN"
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
        vapidKey: "BJWt4xgb5PoOM9hapBj-yIkgaMK8leQxEGMvtn_bOomMGuX1LLHvHUg6eWRuhuh-RyzF5Lnk6WOnTZjKU6hNdrw",
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
