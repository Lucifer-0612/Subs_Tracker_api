import { Router } from "express";
import { getUsers } from "../controllers/user.controllers.js";\
import authorize from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.get('/',getUsers)

userRouter.get('/:id',authorize,getUsers)

userRouter.post('/',(req,res)=>
{
    res.send({title: 'CREATE new  user'})
})
userRouter.put('/:id',(req,res)=>
{
    res.send({title: 'Update user'})
})
userRouter.delete('/:id',(req,res)=>
{
    res.send({title: 'Delete User'})
})

export default userRouter;