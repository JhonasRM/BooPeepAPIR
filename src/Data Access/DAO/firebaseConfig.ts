const dotenv = require('dotenv') 
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_AUTH_APIKEY,
    authDomain: process.env.FIREBASE_AUTH_AUTHDOMAIN,
    projectId: process.env.FIREBASE_AUTH_PROJECTID,
    storageBucket: process.env.FIREBASE_AUTH_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_AUTH_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_AUTH_APPID,
    measurementId: process.env.FIREBASE_AUTH_MEASUREMENTID
  };

export {firebaseConfig}
  