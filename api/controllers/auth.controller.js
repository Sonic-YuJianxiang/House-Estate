import e from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signout = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 12); // 12 is the salt

    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json(error.message);
    }
};