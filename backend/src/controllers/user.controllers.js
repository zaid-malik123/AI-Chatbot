import User from "../models/user.model.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export const signup = async (req, res, next) => {
    try {
        const {userName, email, password} = req.body;
        // console.log(req.body)
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(401).json({message:"User already exist"})
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            userName,
            email,
            password: hash
        })
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.cookie("token", token)
        res.status(201).json(user)

    } catch (error) {
        res.status(501).json({message: error.message})
    }
}

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const existUser = await User.findOne({email})
        if(!existUser){
           return res.status(401).json({message:"email and password is invalid"}) 
        }
        const isMatch = await bcrypt.compare(password, existUser.password)
        if(!isMatch){
             return res.status(401).json({message:"email and password is invalid"}) 
        }
        const token = jwt.sign({id: existUser._id}, process.env.JWT_SECRET)
        res.cookie("token", token)
        res.status(201).json(existUser)
    } catch (error) {
       res.status(501).json({message: error.message})
    }
}

export const logout = (req, res, next) => {
try {
    res.clearCookie("token");
    res.json({message: "logout successfully"})
} catch (error) {
  res.status(501).json({message: error.message})
}
}

export const currentUser = async (req, res, next) => {
try {
    const user = await User.findById(req.userId)

    if(!user){
        return res.status(400).json({message: "User does not exist"})
    }

    return res.status(200).json(user)
} catch (error) {
  res.status(501).json({message: error.message})
}
}
