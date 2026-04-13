const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const getHealthDataFromDatabaseSQL = `Select age,weight,height, gender from health where user_id = ?`;

const updateHealthDataInDatabaseSQL = `
    INSERT INTO health (user_id, age, weight, height, gender)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        age = VALUES(age),
        weight = VALUES(weight),
        height = VALUES(height),   `


export const getHealthDataFromDatabase = async (userId) => {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.query(getHealthDataFromDatabaseSQL, [userId]);
        return rows[0];
    } catch (error) {
        console.error('Error occurred while fetching health data from database:', error);
        throw error;
    } finally {
        connection.release();
    }
}

export const updateHealthDataInDatabase = async (userId, age, weight, height, gender) => {
    const connection = await db.getConnection();
    try {
        const [result] = await connection.query(updateHealthDataInDatabaseSQL, [userId, age, weight, height, gender]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error occurred while updating health data in database:', error);
        //rollback transaction if necessary
        throw error;
    } finally {
        connection.release();
    }
}