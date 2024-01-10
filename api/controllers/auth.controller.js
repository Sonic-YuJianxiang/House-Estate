import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import { Jwt } from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 12); // 12 is the salt

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
        const existingUser = await User.findOne({ email });
        if (!existingUser) next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(
            password,
            existingUser.password
        );
        if (!validPassword) next(errorHandler(401, "Wrong Credentials!"));
        // create a token
        const token = Jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET,
        );
        const { password: pwd, ...rest } = existingUser._doc;

        // put the token into a cookie and send the cookie in the response
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};