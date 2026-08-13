import express from 'express'
import userRouter from './router/user.router.js'
import postRouter from './router/post.router.js'
import commentRouter from './router/comment.router.js'
import { error_hander } from './middlewares/error_hander.js'
const app = express()
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)
app.use(error_hander)
export {app}