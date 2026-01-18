const express = require('express');
const orderRoutes = require('./routes/order.routes');
const courierRoutes = require('./routes/courier.routes');

const app = express();
app.use(express.json());
app.use('/orders', orderRoutes);
app.use('/couriers', courierRoutes);

module.exports = app;
