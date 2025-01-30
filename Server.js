////////////////////////////
//Entry point for the server
////////////////////////////


const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');
const aiRoutes = require('./routes/ai');

// Use Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/payments', paymentRoutes);
app.use('/ai', aiRoutes);
app.use("/questions", questionRoutes);
app.use("/questions", questionRoutes);


// Database connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log('Database connection error:', err));

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


