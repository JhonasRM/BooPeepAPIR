import { FirebaseApp } from "@firebase/app";
import { initializeApp } from "firebase-admin";
import { getAuth } from "firebase/auth";

const dotenv = require('dotenv') 
dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyCWRSX8D_aONfY-MrLJp76Srcn2lBILCxo",
  authDomain: "apirestoop.firebaseapp.com",
  projectId: "apirestoop",
  storageBucket: "apirestoop.appspot.com",
  messagingSenderId: "40114630052",
  appId: "1:40114630052:web:5668b0f1321a118c57a531",
  measurementId: "G-1DQZRW0F8S"
};

export { firebaseConfig }