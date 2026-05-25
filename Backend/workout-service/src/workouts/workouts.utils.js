const { db } = require('../endpoint.utils');

const GET_WORKOUT_HISTORY = `
    SELECT history_id, intensity_level, workout_log, created_at
    FROM workout_history
    WHERE user_id = ?
    ORDER BY created_at DESC;
`;

const INSERT_WORKOUT_HISTORY = `
    INSERT INTO workout_history (user_id, intensity_level, workout_log)
    VALUES (?, ?, ?);
`;

const getWorkoutDataFromDatabaseSQL = async (userId) => {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.query(GET_WORKOUT_HISTORY, [userId]);
        return rows;
    } catch (error) {
        console.error('Error occurred while fetching workout data from database:', error);
        throw error;
    } finally {
        connection.release();
    }
}

const insertWorkoutDataInDatabaseSQL = async (userId, intensityLevel, workoutLog) => {
    const connection = await db.getConnection();
    try {
        const [result] = await connection.query(INSERT_WORKOUT_HISTORY, [userId, intensityLevel, JSON.stringify(workoutLog)]);
        return result.insertId;
    } catch (error) {
        console.error('Error occurred while inserting workout data in database:', error);
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    getWorkoutDataFromDatabaseSQL,
    insertWorkoutDataInDatabaseSQL
}