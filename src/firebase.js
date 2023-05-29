import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOJoWnFgfR-CYHM6Sg3BXkbG1wiPOhb6Y",
  authDomain: "wv24-artists-app.firebaseapp.com",
  projectId: "wv24-artists-app",
  storageBucket: "wv24-artists-app.appspot.com",
  messagingSenderId: "580671529837",
  appId: "1:580671529837:web:91edd952f34bbd4c9df064"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const storage = firebase.storage();

export {
  storage, firestore as default
}