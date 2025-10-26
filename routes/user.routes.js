import { Router } from "express";
const userRouter = Router();

userRouter.get('/',(req,res)=>
{
    res.send({title: 'GET all the user'})
})

userRouter.get('/:id',(req,res)=>
{
    res.send({title: 'GET user detail'})
})
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