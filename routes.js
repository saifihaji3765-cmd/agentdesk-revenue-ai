const express = require("express");

const {
  getApiStatus,
  getHealthStatus,
  generateProposal
} = require("./controllers");

const router = express.Router();

router.get("/api", getApiStatus);

router.get("/api/health", getHealthStatus);

router.post("/api/proposal", generateProposal);

module.exports = router;
