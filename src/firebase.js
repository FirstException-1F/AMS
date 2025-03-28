// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <-- Added import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX5HfLqdX_CDsBY_IU1HlXh9BZCHRGIwg",
  authDomain: "ambulance-booking-system-d774d.firebaseapp.com",
  projectId: "ambulance-booking-system-d774d",
  storageBucket: "ambulance-booking-system-d774d.firebasestorage.app",
  messagingSenderId: "711902605742",
  appId: "1:711902605742:web:fab1c93827f24aed87983f",
  measurementId: "G-TKLFKEX3DS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); 
