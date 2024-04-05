import express, { Request, Response } from 'express';
import router from "./Presentation/View/router";
import app from "./Presentation/View/app";
import * as admin from 'firebase-admin';
import serviceAccount from './Data Access/DAO/serviceAccountKey.json';

const port = 3000

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  })

app.use(express.json())
// app.use(router)

app.get('/usuarios', async (req: Request, res: Response) => {
    try {
      // Teste de conexão com o Firestore
      await admin.firestore().collection('usuarios').get();
  
      const snapshot = await admin.firestore().collection('usuarios').get();
      const usuarios: any[] = [];
      snapshot.forEach(doc => {
        usuarios.push(doc.data());
      });
      res.json(usuarios);
    } catch (error) {
      console.error('Erro ao acessar o Firestore:', error);
      res.status(500).send('Erro ao acessar o Firestore');
    }
  });

app.listen(port, () => {
    console.log(`O servidor está online na porta ${port}`)
})
