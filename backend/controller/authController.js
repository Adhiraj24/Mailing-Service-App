import express from 'express'

import bcryptjs from 'bcryptjs'
import User from '../models/userModel.js'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'

export const signup = async (req, res) => {
    const { email, password, name } = req.body

    try {
        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: "All Field are required" })
        }

        const userAlreadyExit = await User.findOne({ email })

        if (userAlreadyExit) {
            return res.status(400).json({ success: false, message: "User Already exists" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const verificationToken = Math.floor(100000 + Math.random() * 900000)

        console.log(verificationToken);


        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken: verificationToken,
            verificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000
        })

        await user.save()

        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        })

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => { 
    const { email, password } = req.body; 
    console.log(email, password); 
    if (!email || !password) { 
        return res.status(400).json({ success: false, message: "All fields are required" }); 
    } 
    try { 
    const user = await User.findOne({ email }); 
    if (!user) { 
        return res.status(404).json({ success: false, message: "User not found" }); 
    } 
    const isMatch = await bcryptjs.compare(password, user.password); 
    if (isMatch) { 
        return res.status(200).json({ success: true, message: "User logged in successfully" }); 
    } 
    
    return res.status(401).json({ success: false, message: "Invalid credentials" }); 
} catch (error) { 
    console.error(error); 
    return res.status(500).json({ success: false, message: "Server error" }); 
}};

export const logout = async (req, res) => {
    res.send("login route")
}