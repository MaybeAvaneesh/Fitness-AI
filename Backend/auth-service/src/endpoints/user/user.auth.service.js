const { saveUserToDatabaseSQL , fetchProfileSQL, deleteUserSQL,checkForExistingUserSQL,fetchUserByEmailSQL, generateAccessToken,generateRefreshToken} = require('./user.auth.utils')
const bcrypt = require('bcrypt');


const createUser = async(userData) => {
    // Simulate user creation logic here
    // For example, you can check if the user already exists in the database and throw an error if it does
    if (await checkForExistingUserSQL(userData.email)) {
        throw new Error('User already exists');
    }
    const passwordHash = await bcrypt.hash(userData.password, 12);
    userData.password = passwordHash;

    const affectedRows = await saveUserToDatabaseSQL(userData);
    return affectedRows;
}

const validateUser = async(credentials) => {
    // Simulate user validation logic here
    // For example, you can check if the user exists in the database and if the provided password matches the stored password
    const user = await fetchUserByEmailSQL(credentials.email);
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const match = await bcrypt.compare(credentials.password, user.password);
    if (!match) {
        throw new Error('Invalid credentials');
    }
    const accessToken = generateAccessToken({id: user.id, email: user.email});
    const refreshToken = generateRefreshToken({id: user.id, email: user.email});
    return { accessToken , refreshToken};

}

const getUserProfile = async(userId) => {
    // Simulate fetching user profile logic here
    // For example, you can fetch the user profile from the database based on the provided userId and return it
    const isValid = await checkForExistingUserSQL(userId);
    if(!isValid) {
        throw new Error('User not found');
    }
    const userProfile = await fetchProfileSQL(userId);

    return userProfile;
}

const deleteUser = async(userId) => {
    // Simulate user deletion logic here
    // For example, you can check if the user exists in the database and delete the user if it does
    const isValid = await checkForExistingUserSQL(userId);
    if(!isValid) {
        throw new Error('User not found');
    }
    const affectedRows = await deleteUserSQL(userId);
    return affectedRows;
}

module.exports = {
    createUser,
    validateUser,
    getUserProfile,
    deleteUser
}