const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login', scope: ['profile', 'email', 'openid'] }),
    (req, res) => {
        const token = jwt.sign(
            { 
                userId: req.user._id.toString(),
                email: req.user.email,
                name: req.user.name,
                iat: Math.floor(Date.now() / 1000)
            }, 
            process.env.JWT_SECRET || 'defaultSecret', 
            { expiresIn: '24h' }
        );  
        res.redirect(`http://localhost:5173?token=${token}`);
    }
);

router.get('/userinfo', authenticateJWT, (req, res) => {
    if (req.user) {
        res.json({
            userId: req.user._id,
            username: req.user.name,
            email: req.user.email
        })
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

router.get('/logout', authenticateJWT, (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});


module.exports = router;
