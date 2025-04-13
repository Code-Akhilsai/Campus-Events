import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3ZchM5dxJron5kaTCtkuXJClUfLJVWdI",
  authDomain: "react-project-e741f.firebaseapp.com",
  projectId: "react-project-e741f",
  storageBucket: "react-project-e741f.firebasestorage.app",
  messagingSenderId: "769806281000",
  appId: "1:769806281000:web:27e7706eac921ccf2b481d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
