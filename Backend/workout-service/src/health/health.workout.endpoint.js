const server = require('express').Router();
const { requireSelf } = require('@power-ml/auth-lib/middleware');

const { getHealth, updateHealth } = require('./health.service');

server.get('/:userId', requireSelf, async (req, res) => {
    console.log('Health endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    // Simulate fetching health data logic here
    // For example, you can fetch the health data from the database and return it in the response
    try {
        const userId = req.params.userId;
        const healthData = await getHealth(userId);
        res.status(200).json(healthData);
    }catch (error) {
        console.error('Error occurred while fetching health data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

server.put('/:userId', requireSelf, async (req, res) => {
    console.log('Health endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    // Simulate updating health data logic here
    // For example, you can update the health data in the database and return a success message in the response
    try {
        const userId = req.params.userId;
        const healthData = req.body;
        await updateHealth(userId, healthData);
        res.status(200).json({ message: 'Health data updated successfully' });
    }catch (error) {
        console.error('Error occurred while updating health data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = server;