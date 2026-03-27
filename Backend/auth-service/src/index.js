const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;


app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Auth service is healthy' });
});

