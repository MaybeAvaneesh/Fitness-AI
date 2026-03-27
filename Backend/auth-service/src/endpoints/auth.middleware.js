const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    if (!req.headers['authorization'].startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Invalid token format' });
    }
    
    const actualToken = token.split(' ')[1];

    try{
        const decoded = jwt.verify(actualToken , process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    }catch(error) {
        console.error('Error occurred while verifying token:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
             return res.status(500).json({ message: 'Internal server error' });
        }
     }
}

module.exports = {
    verifyToken
}