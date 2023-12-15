// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzXrGWcF-xmp5xGea7n4r_tLMxCmFElS4",
  authDomain: "whalesbook-686d1.firebaseapp.com",
  projectId: "whalesbook-686d1",
  storageBucket: "whalesbook-686d1.appspot.com",
  messagingSenderId: "400449885210",
  appId: "1:400449885210:web:1cecc85ad3e73b75852da3",
  measurementId: "G-127X3N7D1R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// auth.languageCode = "it";
auth.useDeviceLanguage();
