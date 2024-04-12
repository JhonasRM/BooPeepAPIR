import app from "./Presentation/View/app"

const port = 2297

app.listen(port, () => {
    console.log(`O servidor está online na porta ${port}`)
})