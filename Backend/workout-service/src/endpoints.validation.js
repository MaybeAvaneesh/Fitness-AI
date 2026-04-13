export const validateUser = (userId) => {
    // Simulate user validation logic here
    // For example, you can check if the user exists in the database and if the provided userId is valid
    //check for sql injection
    const isValid = injectionCheck(userId);
    if (!isValid) {
        throw new Error('Invalid userId');
    }
}

const injectionCheck = (input) => {
    const sqlInjectionPattern = /(\b(SELECT|INSERT|DELETE|UPDATE|DROP|ALTER|CREATE|TRUNCATE|EXEC|UNION|OR|AND)\b|\-\-|\;|\')/i;
    return !sqlInjectionPattern.test(input);
}