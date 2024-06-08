const dotenv = require('dotenv') 
dotenv.config();
import * as admin from "firebase-admin";
import { serviceAccount } from "./serviceAccountKey";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: process.env.FIREBASE_CONFIG_WEB_DATABASEURL
});

const app = admin;
export { app as AppAdmin };
