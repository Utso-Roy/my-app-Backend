const express = require("express");

const {
  getHelpRequests,
  getHelpRequestById,
  createHelpRequest,
  updateHelpRequest,
  deleteHelpRequest,
} = require("../controllers/helpRequest.controller");

const router = express.Router();

// GET all help requests
router.get("/", getHelpRequests);

// GET single help request
router.get("/:id", getHelpRequestById);

// POST create help request
router.post("/", createHelpRequest);

// PUT update help request
router.put("/:id", updateHelpRequest);

// DELETE help request
router.delete("/:id", deleteHelpRequest);

module.exports = router;