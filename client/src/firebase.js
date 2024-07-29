// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-f28eb.firebaseapp.com",
  projectId: "real-estate-f28eb",
  storageBucket: "real-estate-f28eb.appspot.com",
  messagingSenderId: "68586953712",
  appId: "1:68586953712:web:1f364aff911104a4171b35"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);