import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";

export const signIn = async (req,res) => {
    const {email, password} = req.body;
    try {
        const exisistingUser = await User.findOne({email});
        if(!exisistingUser) return res.status(404).json({message:'User not found!'});

        const ispasswordCorrect = bcrypt.compare(password, exisistingUser.password);
        if(!ispasswordCorrect) return res.status(400).json({message: 'Invalid Credentials'});

        const token = jwt.sign({email:exisistingUser.email, id: exisistingUser._id}, 'test', {expiresIn:"1h"})

        res.status(200).json({result:exisistingUser, token})
        
    } catch (error) {
        res.status(500).json({message:'Something went wrong!'})
    }
}

export const signUp =  async (req,res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    
    try {
        const exisistingUser = await User.findOne({email});
       
        if(exisistingUser) return res.status(400).json({message:'User already exist!'});

        if(password !== confirmPassword) return res.status(400).json({message: 'Passwords don\'t match'});

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = {name:`${firstName} ${lastName}`, email:email, password:hashedPassword};
        const newUser = new User(user);
        
        const result = await newUser.save();
      

        const token = jwt.sign({email:result.email, id: result._id}, 'test', {expiresIn:"1h"});
        res.status(200).json({result, token})
        
    } catch (error) {
        res.status(500).json({message:'Something went wrong!'})
    }
    
}