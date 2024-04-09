  
import express from 'express';
import * as admin from 'firebase-admin';
    var serviceAccount = require('./serviceAccountKey.json');
    
      // Inicialize o aplicativo do Firebase com as credenciais do seu projeto
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
      });

      export const conn = admin
  
    
  