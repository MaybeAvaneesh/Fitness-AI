const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


const saveUserToDatabaseSQL = async (userData) => {
    const connection = await db.getConnection();
    const { username, email, password , phoneNumber } = userData;
    try{
        
        const [result] = await db.query('INSERT INTO users (username, email, password, phone_number) VALUES (?, ?, ?, ?)', [username, email, password, phoneNumber]);
        return result.affectedRows;

    }catch (error){
        console.error('Error occurred while saving user to database:', error);
        throw error;
        
    }finally {
        
        connection.release();
    }
    
    
}

const fetchProfileSQL = async (userId) => {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.query('SELECT id, username, email, phone_number FROM users WHERE id = ?', [userId]);
        return rows[0];
    } catch (error) {
        console.error('Error occurred while fetching user profile from database:', error);
        throw error;
    }finally {
        connection.release();
    }
}

const deleteUserSQL = async (userId) => {
    const connection = await db.getConnection();
    try {
        const [result] = await connection.query('UPDATE users SET is_active = 0 WHERE id = ?', [userId]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error occurred while deleting user from database:', error);
        throw error;
    }finally {
        connection.release();
    }
}

const checkForExistingUserSQL = async (email ) => {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.query('SELECT id FROM users WHERE email = ? AND is_active = 1', [email]);
        return rows.length > 0;
    } catch (error) {
        console.error('Error occurred while checking for existing user in database:', error);
        throw error;
    }finally {
        connection.release();
    }
}

const checkPasswordMatchSQL = async (email, password) => {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.query('SELECT id FROM users WHERE email = ? AND password = ? AND is_active = 1', [email, password]);
        return rows.length;
    } catch (error) {
        console.error('Error occurred while checking password match in database:', error);
        throw error;
    }finally {
        connection.release();
    }

}

const fetchUserByEmailSQL = async (email) => {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.query('SELECT id, username, email, password FROM users WHERE email = ? AND is_active = 1', [email]); 
        return rows[0];
    } catch (error) {
        console.error('Error occurred while fetching user by email from database:', error);
        throw error;
    }finally {
        connection.release();
    }
}

const generateAccessToken = (payload) => {
    // Implementation for generating access token
    return  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (payload) => {
    // Implementation for generating refresh token
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

module.exports = {
    saveUserToDatabaseSQL,
    fetchProfileSQL,
    deleteUserSQL,
    checkForExistingUserSQL,
    checkPasswordMatchSQL,
    fetchUserByEmailSQL,
    generateAccessToken,
    generateRefreshToken
}