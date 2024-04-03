import express from "express";
import router from "./Presentation/View/router";
import app from "./Presentation/View/app";

const port = 3000

app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`O servidor está online na porta ${port}`)
})

app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>');
});
