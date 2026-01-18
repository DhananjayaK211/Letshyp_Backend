const couriers = require('../data/couriers');
const { manhattanDistance } = require('../utils/distance');

exports.findNearestCourier = (pickup, express) => {
  let best = null, min = Infinity;
  for (const c of couriers) {
    if (!c.available) continue;
    const d = manhattanDistance(pickup, c);
    if (express && d > 5) continue;
    if (d < min) { min = d; best = c; }
  }
  return best;
};

exports.assignCourier = c => c.available = false;
exports.releaseCourier = c => c.available = true;
