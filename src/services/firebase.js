import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqcGqPB3XazFXZzEBMqK0afbhbFxDR-h0",
  authDomain: "chat-hacker-16c63.firebaseapp.com",
  projectId: "chat-hacker-16c63",
  storageBucket: "chat-hacker-16c63.appspot.com",
  messagingSenderId: "213826325806",
  appId: "1:213826325806:web:797177881f57298e27febf"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export { db, auth };
