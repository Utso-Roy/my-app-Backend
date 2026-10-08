const express = require("express");

const {
  getDisasters,
  getDisasterById,
  createDisaster,
  updateDisaster,
  deleteDisaster,
} = require("../disaster.controller");

const router = express.Router();

// GET all disasters
router.get("/", getDisasters);

// GET single disaster
router.get("/:id", getDisasterById);

// POST create disaster
router.post("/", createDisaster);

// PUT update disaster
router.put("/:id", updateDisaster);

// DELETE disaster
router.delete("/:id", deleteDisaster);

module.exports = router;