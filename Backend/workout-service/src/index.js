const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { requireAuth } = require('@power-ml/auth-lib/middleware');
require('dotenv').config();

const server = express();
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5001;

// Public — no auth required
server.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'Workout service is healthy' });
});

// Everything below this line requires a valid JWT
server.use('/workouts', requireAuth, require('./workouts/workouts.workout.endpoint'));
server.use('/pain',     requireAuth, require('./pain/pain.workout.endpoint'));
server.use('/health',   requireAuth, require('./health/health.workout.endpoint'));
server.use('/goals',    requireAuth, require('./goals/goals.workout.endpoint'));

server.listen(PORT, () => {
    console.log(`Workout service is running on port ${PORT}`);
});