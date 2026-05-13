const express = require("express");

const {
  getApiStatus,
  getHealthStatus,
  generateProposal
} = require("./controllers");

const {
  saveTraining
} = require("./trainingController");

const {
  getLeads
} = require("./leadController");

const {
  getAlerts
} = require("./alertController");

const router = express.Router();

router.get(
  "/api",
  getApiStatus
);

router.get(
  "/api/health",
  getHealthStatus
);

router.post(
  "/api/proposal",
  generateProposal
);

router.post(
  "/api/training",
  saveTraining
);

router.get(
  "/api/leads",
  getLeads
);

router.get(
  "/api/alerts",
  getAlerts
);

module.exports = router;
