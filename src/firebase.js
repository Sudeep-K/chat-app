import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqK7kN56YG5q3CdUeGXi7iO9LFUUxM6-c",
  authDomain: "buzzchatapp-20e26.firebaseapp.com",
  projectId: "buzzchatapp-20e26",
  storageBucket: "buzzchatapp-20e26.appspot.com",
  messagingSenderId: "326729255894",
  appId: "1:326729255894:web:cd309546e6b323adb57277",
  measurementId: "G-G8TX0DNF0H"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();