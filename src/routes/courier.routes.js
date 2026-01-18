const express = require('express');
const router = express.Router();
const couriers = require('../data/couriers');
router.get('/', (req, res) => res.json(couriers));
module.exports = router;
