// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgqajIqnAfJqKRVKYKSev_YxvrVk-SFuk",
  authDomain: "miru-472a5.firebaseapp.com",
  projectId: "miru-472a5",
  storageBucket: "miru-472a5.appspot.com",
  messagingSenderId: "80091276735",
  appId: "1:80091276735:web:45c2d211c22ed198942d0a",
  measurementId: "G-WRSP9EHELS",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const analytics = getAnalytics(app)
export {app, auth, analytics}
