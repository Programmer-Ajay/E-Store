// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  {GoogleAuthProvider,getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ecommerce-374f6.firebaseapp.com",
  projectId: "ecommerce-374f6",
  storageBucket: "ecommerce-374f6.firebasestorage.app",
  messagingSenderId: "968309422568",
  appId: "1:968309422568:web:5043609af9c659143ecc5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider= new GoogleAuthProvider()

export {auth,provider}


// so isko do cheeze chaihye  getuth and provider like hamne yaha pe google auth liya hai
