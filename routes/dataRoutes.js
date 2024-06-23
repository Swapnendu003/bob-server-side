const express = require('express');
const { getUserData, getAllUsers } = require('../controllers/getUserData');
const datarouter = express.Router();

datarouter.post('/data', getUserData); 
datarouter.get('/data/all', getAllUsers);
module.exports = datarouter;
