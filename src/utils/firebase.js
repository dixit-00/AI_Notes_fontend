
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ainotes123.firebaseapp.com",
  projectId: "ainotes123",
  storageBucket: "ainotes123.firebasestorage.app",
  messagingSenderId: "1018706543743",
  appId: "1:1018706543743:web:7afbe66b57cb8fadc96b4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };