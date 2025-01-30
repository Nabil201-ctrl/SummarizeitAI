<<<<<<< HEAD
import session from 'express-session';
=======
const session = require('express-session');
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production with HTTPS
}));
