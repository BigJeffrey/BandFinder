const express = require('express');
const authRoutes = require('./auth');
const bandRoutes = require('../../../../../Downloads/backend-commits/commit1/backend/src/routes/bands');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/bands', bandRoutes);

module.exports = router;
