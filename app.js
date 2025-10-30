import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js'
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import connectDB from './Database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('api/v1/auth', authRouter)
app.use('api/v1/users', userRouter)
app.use('api/v1/subscriptions', subscriptionRouter)
app.use(errorMiddleware);
app.get('/', (req, res) =>
{
    res.send("welcome to subscription tracker api");
})

app.listen( PORT, async ()=>
{
    console.log(`server is running on port http://localhost:${PORT}`);
    await connectDB();
    
})

export default app;