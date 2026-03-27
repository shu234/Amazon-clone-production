import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAApMPMxalc0gBlXBI3GcrIzxTMdJsgH2w",
  authDomain: "clone-e6e7f.firebaseapp.com",
  projectId: "clone-e6e7f",
  storageBucket: "clone-e6e7f.firebasestorage.app",
  messagingSenderId: "257350110488",
  appId: "1:257350110488:web:3088d60117d6b4b6e0626d",
  measurementId: "G-75TMZDB3DD"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
