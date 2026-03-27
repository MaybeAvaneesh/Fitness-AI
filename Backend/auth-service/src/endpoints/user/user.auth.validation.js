
const validateUser =(userData) => {
    const { username, email, password , phoneNumber } = userData;
    if (!username || !email || !password || !phoneNumber) {
        throw new Error('Missing required fields');
     }
     if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string' || typeof phoneNumber !== 'string') {
        throw new Error('Invalid data types for fields');
     }
     // Add more validation rules as needed (e.g., email format, password strength, etc.)
     validatePasswordStrength(password);
}

const validatePasswordStrength = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChars) {
        throw new Error('Password does not meet strength requirements');
    }
}

const validateCreateUserFields = (req, res, next) => {
    try {
        validateUser(req.body);
        next();
    } catch (error) {
        console.error('Error occurred while validating user data:', error);
        res.status(400).json({ message: error.message });
    }  
}

const validateLoginFields = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Invalid data types for fields' });
    }
    next();
}

const validateDeleteUserFields = (req, res, next) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid data types for fields' });
    }
    next();
}

const validateFetchUserProfileFields = (req, res, next) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid data types for fields' });
    }
    next();
}

module.exports = {
    validateCreateUserFields,
    validateLoginFields,
    validateDeleteUserFields,
    validateFetchUserProfileFields
}