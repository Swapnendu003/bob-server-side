const express = require('express');
const router = express.Router();
const financialController = require('../controllers/financialController');

router.post('/financial-advice', financialController.getFinancialAdvice);

module.exports = router;
