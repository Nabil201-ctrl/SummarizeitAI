// /services/authService.js
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import User from"../models/User";
const dotenv = require('dotenv');
dotenv.config();
exports.registerUser = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User({ ...userData, password: hashedPassword });
        await user.save();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return { user, token };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};