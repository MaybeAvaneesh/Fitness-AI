const { getWorkoutDataFromDatabaseQL , updateWorkoutDataInDatabaseQL } = require('./workouts.service');
const { validateUser } = require('../endpoints.validation')

export const getWorkoutData = async (userId) => {

    try{
        validateUser(userId);
        return await getWorkoutDataFromDatabaseQL(userId);
    } catch (error) {
        console.error('Error occurred while fetching workout data:', error);
        throw error;
    }
    
}

export const updateWorkoutData = async (userId, workoutData) => {

    try {
        validateUser(userId);
        return await updateWorkoutDataInDatabaseQL(userId, workoutData);
    } catch (error) {
        console.error('Error occurred while updating/creating workout data:', error);
        throw error;
    }
}