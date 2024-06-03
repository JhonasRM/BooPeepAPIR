import { Router } from "express";
const router = Router()

const UserRouter = require('../Routes/UserRouter')
const PostRouter = require('../Routes/PostRouter')
const ChatRouter = require('../Routes/ChatRouter')

router.use('/', UserRouter)
router.use('/', PostRouter)
router.use('/', ChatRouter)

export default router