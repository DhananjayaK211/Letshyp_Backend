const orders = require('../data/orders');
const couriers = require('../data/couriers');
const lock = require('../utils/lock');
const courierService = require('./courierService');
const { isValidTransition } = require('../utils/stateMachine');

exports.createOrder = async data => {
  await lock.acquire();
  try {
    const order = { id: orders.length + 1, state: "CREATED", ...data, courierId: null };
    const courier = courierService.findNearestCourier(data.pickup, data.deliveryType === "EXPRESS");
    if (courier) {
      courierService.assignCourier(courier);
      order.courierId = courier.id;
      order.state = "ASSIGNED";
    }
    orders.push(order);
    return order;
  } finally { lock.release(); }
};

exports.updateOrderState = (id, newState) => {
  const order = orders.find(o => o.id === id);
  if (!order) throw new Error("Order not found");
  if (!isValidTransition(order.state, newState)) throw new Error("Invalid state transition");
  order.state = newState;
  if (["DELIVERED","CANCELLED"].includes(newState)) {
    const c = couriers.find(c => c.id === order.courierId);
    if (c) c.available = true;
  }
  return order;
};

exports.getOrders = () => orders;
