import { Router } from "express";
const router = Router()

const UserRouter = require('../Routes/UserRouter')
const PostRouter = require('../Routes/PostRouter')
const ComentRouter = require('../Routes/ComentRouter')
const ChatRouter = require('../Routes/ChatRouter')

router.use('/', UserRouter)
router.use('/', PostRouter)
router.use('/', ChatRouter)
router.use('/', ComentRouter)

export default router