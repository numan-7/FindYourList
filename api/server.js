const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const app = express();
const authRoutes = require('./routes/auth');
const watchlistRoutes = require('./routes/watchlist');
const authenticateJWT = require('./middleware/authenticateJWT');

app.use(express.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport-setup');

const DB_BASE_URL = process.env.DB_BASE_URL;
mongoose.connect(`${DB_BASE_URL}/watchlist`)
    .then(() => console.log("DB Connection Successful"))
    .catch(console.error);

app.use('/auth', authRoutes);
app.use('/watchlist', authenticateJWT, watchlistRoutes);

const server = app.listen(3000, () => console.log("Server started on 3000"));
module.exports = { app, server };
