  
import express from 'express';
import * as admin from 'firebase-admin';
import { serviceAccount } from './serviceAccountKey';
import { initializeApp } from 'firebase-admin/app';
import { firebaseConfig } from './firebaseConfig';
    
      // const Initialize = admin.initializeApp({
      //   credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
      // });

      const Initialize = initializeApp(firebaseConfig)
      const conn = admin
      export {conn, Initialize}
    
  