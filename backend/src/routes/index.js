const express = require('express');
const authRoutes = require('./auth');
const bandRoutes = require('./bands');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/bands', bandRoutes);

module.exports = router;
