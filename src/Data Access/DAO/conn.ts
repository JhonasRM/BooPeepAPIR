  
import express from 'express';
import * as admin from 'firebase-admin';
    
      // Inicialize o aplicativo do Firebase com as credenciais do seu projeto
      admin.initializeApp({
        credential: admin.credential.cert(process.env.FIREBASE_CONFIG as admin.ServiceAccount)
      });

      export const conn = admin
  
    
  