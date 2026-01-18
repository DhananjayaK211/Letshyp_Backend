const express = require('express');
const router = express.Router();
const service = require('../services/orderService');

router.post('/', async (req, res) => {
  try { res.json(await service.createOrder(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

router.patch('/:id/state', (req, res) => {
  try { res.json(service.updateOrderState(Number(req.params.id), req.body.state)); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

router.get('/', (req, res) => res.json(service.getOrders()));
module.exports = router;
