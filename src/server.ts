import express, { Request, Response } from 'express';
import router from "./Presentation/View/router";
import app from "./Presentation/View/app";
import * as dotenv from 'dotenv';
import { NextFunction } from 'express-serve-static-core';
dotenv.config();

const port = 3000
const cors = require('cors')

app.use(express.json())
app.use(router)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}))

app.get('/', (req: Request, res: Response) => {
  res.send("<h1>Bem-vindo à API BOOPEEP</h1>")
})
app.listen(port, () => {
    console.log(`O servidor está online na porta ${port}`)
})
