const {db} = require('../endpoint.utils');

const getHealthDataFromDatabaseSQL = `Select age,weight_kg,height_cm, gender from health where user_id = ?`;

const updateHealthDataInDatabaseSQL = `
    INSERT INTO health (user_id, age, weight_kg, height_cm, gender)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        age = VALUES(age),
        weight_kg = VALUES(weight_kg),
        height_cm = VALUES(height_cm), 
        gender = VALUES(gender),
        updated_at = CURRENT_TIMESTAMP;
`;


const getHealthDataFromDatabase = async (userId) => {
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

const updateHealthDataInDatabase = async (userId, age, weight, height, gender) => {
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

module.exports = {
    getHealthDataFromDatabase,
    updateHealthDataInDatabase
}