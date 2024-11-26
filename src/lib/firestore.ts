import { initializeApp } from "firebase/app";
export const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_APIKEY || "",
  authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_FIREBASE_STORAGE_BKT || "",
  messagingSenderId: process.env.NEXT_FIREBASE_MSG_SENDER_ID || "",
  appId: process.env.NEXT_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_FIREBASE_MEASUREMENT_ID || ""
};

export const fireApp = initializeApp(firebaseConfig);