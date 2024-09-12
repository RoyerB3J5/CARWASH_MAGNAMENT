// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu2jdvfirWqrKpbmLgWuD-EGPCvDfQfiE",
  authDomain: "prueba-db-5b72f.firebaseapp.com",
  projectId: "prueba-db-5b72f",
  storageBucket: "prueba-db-5b72f.appspot.com",
  messagingSenderId: "998952694040",
  appId: "1:998952694040:web:60a36b236c2b480efdee6d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);