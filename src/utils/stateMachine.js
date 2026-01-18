const allowedTransitions = {
  CREATED: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["PICKED_UP", "CANCELLED"],
  PICKED_UP: ["IN_TRANSIT"],
  IN_TRANSIT: ["DELIVERED"]
};

exports.isValidTransition = (from, to) => allowedTransitions[from]?.includes(to);
