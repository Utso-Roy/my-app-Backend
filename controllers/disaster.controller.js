const disasterService = require("services/disaster.service");

// GET all disasters
const getDisasters = async (req, res) => {
  try {
    const disasters = await disasterService.getAllDisasters();

    res.status(200).json({
      success: true,
      data: disasters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch disasters",
    });
  }
};

// GET single disaster
const getDisasterById = async (req, res) => {
  try {
    const { id } = req.params;

    const disaster = await disasterService.getDisasterById(id);

    if (!disaster) {
      return res.status(404).json({
        success: false,
        message: "Disaster not found",
      });
    }

    res.status(200).json({
      success: true,
      data: disaster,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch disaster",
    });
  }
};

// POST create disaster
const createDisaster = async (req, res) => {
  try {
    const disasterData = req.body;

    const disaster = await disasterService.createDisaster(disasterData);

    res.status(201).json({
      success: true,
      message: "Disaster created successfully",
      data: disaster,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create disaster",
    });
  }
};

// PUT update disaster
const updateDisaster = async (req, res) => {
  try {
    const { id } = req.params;
    const disasterData = req.body;

    const disaster = await disasterService.updateDisaster(id, disasterData);

    if (!disaster) {
      return res.status(404).json({
        success: false,
        message: "Disaster not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Disaster updated successfully",
      data: disaster,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update disaster",
    });
  }
};

// DELETE disaster
const deleteDisaster = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await disasterService.deleteDisaster(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Disaster not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Disaster deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete disaster",
    });
  }
};

module.exports = {
  getDisasters,
  getDisasterById,
  createDisaster,
  updateDisaster,
  deleteDisaster,
};
