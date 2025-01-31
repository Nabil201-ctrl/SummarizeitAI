import jwt from 'jsonwebtoken';
import User from "../models/User";

// Middleware for authentication
export const authenticateUser = (req, res, next) => {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

// Middleware to check access based on user plan (basic or premium)
export const checkAccess = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // If the user is premium or in trial, give full access (premium features)
        if (user.isPremium || (user.premiumExpires && user.premiumExpires > Date.now())) {
            req.userPlan = "premium"; // Set user plan to premium
            return next(); // Premium users have full access
        }

        // For basic users, grant access to basic features
        if (!user.isPremium) {
            req.userPlan = "basic"; // Set user plan to basic
            return next(); // Basic users have access to basic features
        }

        // Deny access if not a premium user and no trial period
        return res.status(403).json({ error: "Premium access required." });

    } catch (error) {
        return res.status(500).json({ error: "Authorization error." });
    }
};
