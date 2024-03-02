import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10); // 10 is the salt

    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        // next(errorHandler(550, "error from the function"));
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"));
        // create a token by using the sign method of the jwt package
        // JWT is a standard for creating tokens that can be verified by a third party.
        // It is a self-contained token that has all the information needed to validate a user's identity.
        // why we use jwt.sign() method?
        // The sign() method creates a new token based on the payload and the secret key.
        // The payload is the data that we want to store in the token.
        // The secret key is used to sign the token, so that the server can verify that the token is legitimate.
        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET,
        );
        const { password: pwd, ...rest } = validUser._doc;

        // put the token into a cookie and send the cookie in the response
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
            );
            const { password: pass, ...rest } = user._doc;
            res.cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10); // 10 is the salt
            const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), 
            email: req.body.email, password: hashedPassword, avatar: req.body.photo });
            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id },
                process.env.JWT_SECRET,
            );
            const { password: pass, ...rest } = newUser._doc;
            res.cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json("Signout successfully");
    } catch (error) {
        next(error);
    }
};