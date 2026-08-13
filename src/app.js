import express from 'express'
import rateLimit from 'express-rate-limit'
import userRouter from './router/user.router.js'
import postRouter from './router/post.router.js'
import commentRouter from './router/comment.router.js'
import { error_hander } from './middlewares/error_hander.js'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'
const app = express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(express.json())
const limiter=rateLimit({
    windowMs:30*1000,
    max:5,
    message:{
        success:false,
        message:"Too many requests, please try again later"
    }
})
app.use(limiter)
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)
app.use(error_hander)
export {app}