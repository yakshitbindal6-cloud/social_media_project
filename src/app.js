import express from 'express'
const app = express()
app.use(express.json())
import userRouter from './router/user.router.js'
import postRouter from './router/post.router.js'

app.use('/users', userRouter)
app.use('/posts', postRouter)

export {app}