const jwt = require('jsonwebtoken');
const User = require('../model/User');

const auth = async (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'No token provided. Please authenticate.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);
        const userId = decoded.id;
        console.log('Looking for user with ID:', userId);
        const user = await User.findById(userId);
        console.log('User found:', user);

        if (!user) {
            return res.status(401).json({ error: 'User not found. Please authenticate.' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ error: 'Authentication failed. Please authenticate.' });
    }
};

module.exports = auth;