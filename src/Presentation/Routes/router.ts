import { Router } from "express";
const router = Router()

const UserRouter = require('./UserRouter')

router.use('/', UserRouter)


export default router