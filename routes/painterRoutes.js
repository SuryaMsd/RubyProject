const express = require('express');
const router = express.Router();
const painterController = require('../controllers/painterController');

// Define routes for painter-related operations
router.get('/', painterController.getAllPainters);
router.get('/:id', painterController.getPainterById);
router.post('/', painterController.createPainter);

module.exports = router;
