const express = require("express");

const {
  getApiStatus,
  getHealthStatus,
  generateProposal
} = require("./controllers");

const {
  saveTraining
} = require("./trainingController");

const router = express.Router();

router.get("/api", getApiStatus);

router.get("/api/health", getHealthStatus);

router.post(
  "/api/proposal",
  generateProposal
);

router.post(
  "/api/training",
  saveTraining
);

module.exports = router;
