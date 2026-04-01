const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const server = express();
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5001;

server.get('/health', (req, res) => {
    console.log('Health check endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    res.status(200).json({ message: 'Workout service is healthy' });
});

server.use('/workouts', require('./endpoints/workouts/workout.endpoint'));

server.use('/pain', require('./endpoints/pain/pain.workout.endpoint'));

server.use('/health', require('./endpoints/health/health.workout.endpoint'));

server.listen(PORT, () => {
    console.log(`Workout service is running on port ${PORT}`);
});