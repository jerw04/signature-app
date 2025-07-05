
const express = require('express');
const router = express.Router();
const { saveSignature } = require('../controllers/signatureController');

router.post('/', saveSignature);

module.exports = router;
