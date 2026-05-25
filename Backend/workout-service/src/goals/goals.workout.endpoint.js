const server = require('express').Router();
const { requireSelf } = require('@power-ml/auth-lib/middleware');
const {getGoals, updateGoals} = require('./goals.service');

server.get('/:userId', requireSelf, async (req, res) => {
    console.log('Goals endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    // Simulate fetching goals data logic here
    // For example, you can fetch the goals data from the database and return it in the response
    try {
        const userId  = req.params.userId;
        const goalsData = await getGoals(userId);
        res.status(200).json({ goals: goalsData });

    }catch (error) {
        console.error('Error occurred while fetching goals data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

server.put('/:userId', requireSelf, async (req, res) => {
    console.log('Goals endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    // Simulate updating goals data logic here
    // For example, you can update the goals data in the database and return a success message in the response
    try {
        const userId = req.params.userId;
        const { currentGoalsData, futureGoalsData, timeframe } = req.body;
        await updateGoals(userId, currentGoalsData, futureGoalsData, timeframe);
        res.status(200).json({ message: 'Goals data updated successfully' });

    }catch (error) {
        console.error('Error occurred while updating goals data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = server;