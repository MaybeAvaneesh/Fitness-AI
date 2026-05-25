const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const header = req.headers['authorization'];

    if (!header) {
        return res.status(401).json({ message: 'No token provided' });
    }

    if (!header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const requireSelf = (req, res, next) => {
    if (!req.user || req.user.id === undefined) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const tokenUserId = String(req.user.id);
    const paramUserId = String(req.params.userId);

    if (tokenUserId !== paramUserId) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    return next();
};

module.exports = {
    requireAuth,
    requireSelf
};
