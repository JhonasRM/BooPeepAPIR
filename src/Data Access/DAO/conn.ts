import express from "express";
import * as admin from "firebase-admin";
import { serviceAccount } from "./serviceAccountKey";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const conn = admin;
export { conn };
