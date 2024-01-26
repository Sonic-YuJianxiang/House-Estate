// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

console.log(import.meta.env.VITE_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "house-estate-ca646.firebaseapp.com",
  projectId: "house-estate-ca646",
  storageBucket: "house-estate-ca646.appspot.com",
  messagingSenderId: "350009952364",
  appId: "1:350009952364:web:0c11974739d21efcdab049",
  measurementId: "G-7EEK1Q3QHX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);