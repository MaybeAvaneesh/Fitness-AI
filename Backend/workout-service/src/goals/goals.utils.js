const { db }= require('../endpoint.utils');

const GET_GOALS_SQL = `
    SELECT current_goals, future_goals, time_frame FROM goals WHERE user_id = ?;
`;

const UPDATE_GOALS_SQL = `
    INSERT INTO goals (user_id, current_goals, future_goals, time_frame)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        current_goals = VALUES(current_goals),
        future_goals = VALUES(future_goals),
        time_frame = VALUES(time_frame),
        updated_at = CURRENT_TIMESTAMP;
`;

const getGoalsFromDatabaseSQL = async (userId) => {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.query(GET_GOALS_SQL, [userId]);
        return rows[0];
    } catch (error) {
        console.error('Error occurred while fetching goals from database:', error);
        throw error;
    } finally {
        connection.release();
    }
}

const updateGoalsInDatabaseSQL = async (userId, currentGoals, futureGoals, timeFrame) => {
    const connection = await db.getConnection();
    try {
        const [result] = await connection.query(UPDATE_GOALS_SQL, [userId, JSON.stringify(currentGoals), JSON.stringify(futureGoals), timeFrame]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error occurred while updating goals in database:', error);
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    getGoalsFromDatabaseSQL,
    updateGoalsInDatabaseSQL
}