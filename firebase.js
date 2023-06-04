//import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPdxE_nE2vSS0UHUdTWNh6sCgrZ2r4gXg",
  authDomain: "clone-c5738.firebaseapp.com",
  projectId: "clone-c5738",
  storageBucket: "clone-c5738.appspot.com",
  messagingSenderId: "440327170677",
  appId: "1:440327170677:web:7e30b3fa0c9b3b5e55e63c",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
