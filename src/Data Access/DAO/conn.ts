import express from "express";
import * as admin from "firebase-admin";
import { serviceAccount } from "./serviceAccountKey";
import { initializeApp } from "firebase-admin/app";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const conn = admin;
export { conn };
