const server = require('express').Router();
const { requireSelf } = require('@power-ml/auth-lib/middleware');

const { getWorkoutData, logWorkout } = require('./workouts.service');

server.get('/:userId', requireSelf, async (req, res) => {
    console.log('Workout endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    try {
        const userId = req.params.userId;
        const history = await getWorkoutData(userId);
        res.status(200).json({ history });
    } catch (error) {
        console.error('Error occurred while fetching workout history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

server.post('/:userId', requireSelf, async (req, res) => {
    console.log('Workout endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    try {
        const userId = req.params.userId;
        const { intensityLevel, workoutLog } = req.body;
        const historyId = await logWorkout(userId, intensityLevel, workoutLog);
        res.status(201).json({ message: 'Workout logged successfully', historyId });
    } catch (error) {
        console.error('Error occurred while logging workout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = server;