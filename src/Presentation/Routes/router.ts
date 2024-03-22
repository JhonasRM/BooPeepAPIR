import { Router } from "express";
const router = Router()

const UserRouter = require('./UserRouter')
const PostRouter = require('./PostRouter')

router.use('/', UserRouter)
router.use('/', PostRouter)

export default router