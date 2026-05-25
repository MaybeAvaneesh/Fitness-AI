const {db} = require('../endpoint.utils');

const GET_PAIN_DATA_SQL = `SELECT muscle_pain_points, joint_pain_points FROM pain WHERE user_id = ?`;

const UPDATE_PAIN_DATA_SQL = `
    INSERT INTO pain (user_id, muscle_pain_points, joint_pain_points)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
        muscle_pain_points = VALUES(muscle_pain_points),
        joint_pain_points = VALUES(joint_pain_points),
        updated_at = NOW();
`;

const getPainDataFromDatabaseSQL = async (userId) => {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.query(GET_PAIN_DATA_SQL, [userId]);
        return rows;
    } catch (error) {
        console.error('Error occurred while fetching pain data from database:', error);
        throw error;
    } finally {
        connection.release();
    }
}

const updatePainDataInDatabaseSQL = async (userId, musclePainPoints, jointPainPoints) => {
    const connection = await db.getConnection();
    try {
        const [result] = await connection.query(UPDATE_PAIN_DATA_SQL, [userId, JSON.stringify(musclePainPoints), JSON.stringify(jointPainPoints)]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error occurred while updating pain data in database:', error);
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    getPainDataFromDatabaseSQL,
    updatePainDataInDatabaseSQL
}