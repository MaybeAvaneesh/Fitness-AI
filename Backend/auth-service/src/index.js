const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(helmet());
server.use(morgan('dev'));

const PORT = process.env.PORT || 5000;


server.get('/health', (req, res) => {
    console.log('Health check endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    res.status(200).json({ message: 'Auth service is healthy' });
});

server.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);
});

server.use('/user', require('./endpoints/user/user.auth.endpoint'));