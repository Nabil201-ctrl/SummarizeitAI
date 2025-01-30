import jwt from'jsonwebtoken'; // Import jwt module

module.exports = (req, res, next) => {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1]; // Get token from cookies or headers

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
