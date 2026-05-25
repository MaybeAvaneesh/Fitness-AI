const {getHealthDataFromDatabase , updateHealthDataInDatabase} = require('./health.utils');
const { validateUser } = require('../endpoints.validation')

const getHealth = async (userId) => {

    try{
        validateUser(userId);
        return await getHealthDataFromDatabase(userId);
    } catch (error) {
        console.error('Error occurred while fetching health data:', error);
        throw error;
    }
    
}

const updateHealth = async (userId, healthData) => {

    try {
        validateUser(userId);
        return await updateHealthDataInDatabase(userId, healthData);
    }catch (error) {
        console.error('Error occurred while updating/creating health data:', error);
        throw error;
    }
}  

module.exports = {
    getHealth,
    updateHealth
}