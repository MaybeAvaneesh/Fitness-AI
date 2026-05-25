const server = require('express').Router();
const { requireSelf } = require('@power-ml/auth-lib/middleware');

const { getPain, updatePain } = require('./pain.service');

server.get('/:userId', requireSelf, async (req, res) => {
    console.log('Pain endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    // Simulate fetching pain data logic here
    // For example, you can fetch the pain data from the database and return it in the response
    try {
        const userId = req.params.userId;
        const painData = await getPain(userId);
        res.status(200).json(painData);
       
    }catch (error) {
        console.error('Error occurred while fetching pain data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

server.put('/:userId', requireSelf, async (req, res) => {
    console.log('Pain endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    // Simulate updating pain data logic here
    // For example, you can update the pain data in the database and return a success message in the response
    try {
        const userId = req.params.userId;
        const { muscle_pain_points, joint_pain_points } = req.body;
        await updatePain(userId, muscle_pain_points, joint_pain_points);
        res.status(200).json({ message: 'Pain data updated successfully' });
    }catch (error) {
        console.error('Error occurred while updating pain data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = server;