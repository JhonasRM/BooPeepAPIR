import express, { Request, Response } from 'express';
import router from "./Presentation/View/router";
import app from "./Presentation/View/app";
import * as dotenv from 'dotenv';
import { NextFunction } from 'express-serve-static-core';
dotenv.config();

const port = 3000

app.use(express.json())
app.use(router)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/', (req: Request, res: Response) => {
  res.send("<h1>Bem-vindo à API BOOPEEP</h1>")
})
app.listen(port, () => {
    console.log(`O servidor está online na porta ${port}`)
})
