const GET_WORKOUT_DATA = `SELECT workout_data FROM workouts WHERE user_id = ?;`;

const UPDATE_WORKOUT_DATA = `
    INSERT INTO workouts (user_id, workout_data)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE
        workout_data = VALUES(workout_data),
        updated_at = CURRENT_TIMESTAMP;
`;

const getWorkoutDataFromDatabaseSQL = async (userId) => {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.query(GET_WORKOUT_DATA, [userId]);
        return rows[0];
    } catch (error) {
        console.error('Error occurred while fetching workout data from database:', error);
        throw error;
    } finally {
        connection.release();
    }
}

const updateWorkoutDataInDatabaseSQL = async (userId, workoutData) => {
    const connection = await db.getConnection();
    try {
        const [result] = await connection.query(UPDATE_WORKOUT_DATA, [userId, JSON.stringify(workoutData)]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error occurred while updating workout data in database:', error);
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    getWorkoutDataFromDatabaseSQL,
    updateWorkoutDataInDatabaseSQL
}