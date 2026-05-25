const { getGoalsFromDatabaseSQL , updateGoalsInDatabaseSQL } = require('./goals.utils');
const { validateUser } = require('../endpoints.validation')

const getGoals = async (userId) => {

    try{
        validateUser(userId);
        return await getGoalsFromDatabaseSQL(userId);
    } catch (error) {
        console.error('Error occurred while fetching goals:', error);
        throw error;
    }
    
}

const updateGoals = async (userId, currentGoals, futureGoals, timeFrame) => {

    try {
        validateUser(userId);
        return await updateGoalsInDatabaseSQL(userId, currentGoals, futureGoals, timeFrame);
    } catch (error) {
        console.error('Error occurred while updating/creating goals:', error);
        throw error;
    }
}

module.exports = {
    getGoals,
    updateGoals
}