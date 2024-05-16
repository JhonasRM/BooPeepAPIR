import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const dotenv = require('dotenv') 
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_CONFIG_AUTH_APIKEY,
    authDomain: process.env.FIREBASE_CONFIG_AUTH_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_CONFIG_AUTH_DATABASEURL,
    projectId: process.env.FIREBASE_CONFIG_AUTH_PROJECTID,
    storageBucket: process.env.FIREBASE_CONFIG_AUTH_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_CONFIG_AUTH_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_CONFIG_AUTH_APPID,
    measurementId: process.env.FIREBASE_CONFIG_AUTH_MEASUREMENTID
  };
const app = initializeApp(firebaseConfig)

export {app as AuthApp}