import jwt from'jsonwebtoken'; // Import jwt module

const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = generateToken;
