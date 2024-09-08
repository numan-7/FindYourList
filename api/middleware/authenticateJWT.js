const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret', async (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.sendStatus(401);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); 
    }
};

module.exports = authenticateJWT;
