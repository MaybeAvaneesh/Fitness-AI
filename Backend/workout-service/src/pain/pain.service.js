const {getPainData, updatePainData} = require('./pain.workout.service');
const {validateUser} = require('../endpoints.validation');

export const getPain = async (userId) => {

    try{
        validateUser(userId);
        return await getPainData(userId);
    } catch (error) {
        console.error('Error occurred while fetching pain data:', error);
        throw error;
    }
    
}

export const updatePain = async (userId, painData) => {

    try {
        validateUser(userId);
        return await updatePainData(userId, painData);
    } catch (error) {
        console.error('Error occurred while updating/creating pain data:', error);
        throw error;
    }
}  

