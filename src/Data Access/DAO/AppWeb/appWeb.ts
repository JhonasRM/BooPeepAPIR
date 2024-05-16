import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
const dotenv = require('dotenv') 
dotenv.config();

const app = initializeApp(firebaseConfig)

export {app as AppWeb}