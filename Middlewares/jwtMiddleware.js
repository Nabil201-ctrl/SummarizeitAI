<<<<<<< HEAD
import jwt from'jsonwebtoken'; // Import jwt module
=======
const jwt = require('jsonwebtoken');
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = generateToken;
