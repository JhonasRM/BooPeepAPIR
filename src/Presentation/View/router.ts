import { Router } from "express";
const router = Router()

const UserRouter = require('../Routes/UserRouter')
const PostRouter = require('../Routes/PostRouter')

router.use('/', UserRouter)
router.use('/', PostRouter)

export default router