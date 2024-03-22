import express from "express";
import router from "./Presentation/Routes/router";

const port = 4200
const app = express()

app.use(express.json)
app.use(router)

app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>');
});

app.listen(port, () => {
    console.log(`O servidor está online na porta ${port}`)
})