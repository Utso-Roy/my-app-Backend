const disasterRepository = require("../repositories/disaster.repository");

// Get all active disasters
const getAllDisasters = async () => {
  const disasters = await disasterRepository.findAll();
  return disasters.filter(
    (disaster) => disaster.status === "active"
  );
};

module.exports = {
  getAllDisasters,
};