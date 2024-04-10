import express, { Request, Response } from 'express';
import router from "./Presentation/View/router";
import app from "./Presentation/View/app";
import * as dotenv from 'dotenv';

dotenv.config();

const path = require('path');
const port = 3000

app.use(express.json())
app.use(router)
app.use(express.static(path.join(__dirname, './Presentation/View')));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './Presentation/View/index.html'));
});
// app.get('/usuarios', async (req: Request, res: Response) => {
//   try {
//     const collectionRef = admin.firestore().collection('users');
//     const querySnapshot = await collectionRef.get();
//     const users: User[] = [];
//     querySnapshot.forEach((doc) => {
//         const userData = doc.data() as User;
//         users.push(userData);
//     });
//     if(users[1] === null){
//         console.log('Nenhum Usuário encontrado')
//         throw new Error('Nenhum Usuário encontrado')
//     }
//     res.json(users);
// } catch (error) {
//     console.error(`Error fetching users: ${error}`);
// }
//   });

app.listen(port, () => {
    console.log(`O servidor está online na porta ${port}`)
})
