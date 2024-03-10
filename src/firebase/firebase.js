// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Firebase
const createUserWithEmailAndPass = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
const signInWithEmailAndPass= (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export { auth, createUserWithEmailAndPass,signInWithEmailAndPass };
export default auth;