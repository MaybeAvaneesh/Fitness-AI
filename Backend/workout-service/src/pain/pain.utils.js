const GET_DATA_SQL_FROM_DATE_RANGE = `SELECT date, pain_data FROM pain WHERE user_id = ? AND date BETWEEN ? AND ?;`;

const UPDATE_PAIN_DATA_SQL = `
    INSERT INTO pain (user_id, date, pain_data)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
        pain_data = VALUES(pain_data),
        updated_at = CURRENT_TIMESTAMP;
`;

const getPainDataFromDatabaseSQL = async (userId, startDate, endDate) => {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.query(GET_DATA_SQL_FROM_DATE_RANGE, [userId, startDate, endDate]);
        return rows;
    } catch (error) {
        console.error('Error occurred while fetching pain data from database:', error);
        throw error;
    } finally {
        connection.release();
    }
}

const updatePainDataInDatabaseSQL = async (userId, date, painData) => {
    const connection = await db.getConnection();
    try {
        const [result] = await connection.query(UPDATE_PAIN_DATA_SQL, [userId, date, JSON.stringify(painData)]);
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