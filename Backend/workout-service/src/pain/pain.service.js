const {getPainDataFromDatabaseSQL , updatePainDataInDatabaseSQL} = require('./pain.utils');

const {validateUser} = require('../endpoints.validation');

const getPain = async (userId) => {

    try{
        validateUser(userId);
        return await getPainDataFromDatabaseSQL(userId);
    } catch (error) {
        console.error('Error occurred while fetching pain data:', error);
        throw error;
    }
    
}

const updatePain = async (userId, musclePainPoints, jointPainPoints) => {

    try {
        validateUser(userId);
        return await updatePainDataInDatabaseSQL(userId, musclePainPoints, jointPainPoints);
    } catch (error) {
        console.error('Error occurred while updating/creating pain data:', error);
        throw error;
    }
}

module.exports = {
    getPain,
    updatePain
}

