import mongoose, { startSession } from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "../config/env"


export const signup = async (req, res , next) =>
    {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            // logic to create new user 
            const {name , email, password} = req.body;
            const existingUser =await User.findOne({email});
            
            if(existingUser)
            {
                const error = new Error("User already exists");
                error.statusCode = 400;
                throw error;
            }
            //hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password , salt);
            const newUser = new User({
                name,
                email,
                password : hashedPassword
            }, {session});
            
            const token = jwt.sign({userId : newUser[0]._id}, JWT_SECRET_KEY, {expiresIn : JWT_EXPIRES_IN});
            await newUser.save({session});
            await session.commitTransaction();
            session.endSession();
            res.status(201).json({userId : newUser._id , email : newUser.email , token,user : newUser[0]});










        } catch (error) {
            await session.abortTransaction()
            session.endSession();
            next(error);
        }
    }
export const signin = async(req , res , next)=> {}
export const signout = async(req , res , next)=> {}