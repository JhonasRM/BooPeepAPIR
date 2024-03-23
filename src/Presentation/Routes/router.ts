import { Router } from "express";
const router = Router()

const UserRouter = require('./UserRouter')
const PostRouter = require('./PostRouter')

router.use('/user', UserRouter)
router.use('/post', PostRouter)

export default router