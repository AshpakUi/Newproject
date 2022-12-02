import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBBX4G-ESUNlqXkp9mEm4_cYR9QEXIWcC8",
  authDomain: "numberuth.firebaseapp.com",
  projectId: "numberuth",
  storageBucket: "numberuth.appspot.com",
  messagingSenderId: "1001843548713",
  appId: "1:1001843548713:web:d6ffed2b3e06f6b92f7238",
  measurementId: "G-SR5E71P9Z2"
};
const firebase = initializeApp(firebaseConfig);
export default firebase;