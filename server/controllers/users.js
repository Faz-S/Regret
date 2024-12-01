import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtsecret="JWT_SECRET"
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("hey")
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        console.log("heyy")
        const token = jwt.sign({email:user.email,userId: user._id }, jwtsecret, {},(err, res) => {
            if(err) throw err;
            res.cookie("token", token).json("passowrd is ok")
        });
        console.log("hellloooo")
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Create JWT token
        const token = jwt.sign(
            { id: newUser._id, username: newUser.username, email: newUser.email },
            "JWT_SECRET", // You should have a JWT_SECRET in your environment variables
            { expiresIn: '1h' } // Token expiration time
        );

        // Return success message, token, and user info
        res.status(201).json({
            message: "User registered successfully",
            token: token,
            newUser
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
