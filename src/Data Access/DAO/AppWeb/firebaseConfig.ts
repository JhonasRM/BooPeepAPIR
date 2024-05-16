const dotenv = require('dotenv') 
dotenv.config();

export const firebaseConfig = {
    apiKey: process.env.FIREBASE_CONFIG_WEB_APIKEY,
    authDomain: process.env.FIREBASE_CONFIG_WEB_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_CONFIG_WEB_DATABASEURL,
    projectId: process.env.FIREBASE_CONFIG_WEB_PROJECTID,
    storageBucket: process.env.FIREBASE_CONFIG_WEB_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_CONFIG_WEB_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_CONFIG_WEB_APPID,
    measurementId: process.env.FIREBASE_CONFIG_WEB_MEASUREMENTID
  };