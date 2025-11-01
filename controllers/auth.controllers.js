import mongoose, { startSession } from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "../config/env.js"


export const signup = async (req, res , next) =>
    {
        try {
            // logic to create new user
            const {name , email, password} = req.body;

            // For now, skip database operations if not connected
            // This allows the server to run without MongoDB for testing
            if (mongoose.connection.readyState !== 1) {
                // Mock response for testing without DB
                res.status(201).json({
                    userId: "mock-user-id",
                    email: email,
                    token: "mock-jwt-token",
                    message: "Signup successful (DB not connected)"
                });
                return;
            }

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
            });

            const token = jwt.sign({userId : newUser._id}, JWT_SECRET_KEY, {expiresIn : JWT_EXPIRES_IN});
            await newUser.save();
            res.status(201).json({userId : newUser._id , email : newUser.email , token});


        } catch (error) {
            next(error);
        }
    }
export const signin = async(req , res , next)=> {
    try {
       //sign in
    const {email , password} = req.body;
    const existingUser = await User.findOne({email});
    if(!existingUser)
    {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;   
    }
    const isPasswordCorrect = await bcrypt.compare(password , existingUser.password);  
    if(!isPasswordCorrect)
    {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;   
    }
    const token = jwt.sign({userId : existingUser._id}, JWT_SECRET_KEY, {expiresIn : JWT_EXPIRES_IN});
    res.status(200).json({userId : existingUser._id , email : existingUser.email , token});

    } catch (error) {
        //handle error
        next(error);
    }
}
export const signout = async(req , res , next)=> {}