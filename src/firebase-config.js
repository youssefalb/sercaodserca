// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvPgHbju_GBLTSYcHRGY4G12KwhT57FqU",
  authDomain: "od-serca-do-serca.firebaseapp.com",
  projectId: "od-serca-do-serca",
  storageBucket: "od-serca-do-serca.appspot.com",
  messagingSenderId: "254438546153",
  appId: "1:254438546153:web:07640f5be64e81cfd82e78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };