const { getWorkoutDataFromDatabaseSQL , insertWorkoutDataInDatabaseSQL } = require('./workouts.utils');
const { validateUser } = require('../endpoints.validation')

const getWorkoutData = async (userId) => {

    try{
        validateUser(userId);
        return await getWorkoutDataFromDatabaseSQL(userId);
    } catch (error) {
        console.error('Error occurred while fetching workout data:', error);
        throw error;
    }

}

const logWorkout = async (userId, intensityLevel, workoutLog) => {

    try {
        validateUser(userId);
        return await insertWorkoutDataInDatabaseSQL(userId, intensityLevel, workoutLog);
    } catch (error) {
        console.error('Error occurred while logging workout:', error);
        throw error;
    }
}

module.exports = {
    getWorkoutData,
    logWorkout
}