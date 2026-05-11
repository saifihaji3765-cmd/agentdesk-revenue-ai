const express = require("express");

const {
  getApiStatus,
  getHealthStatus
} = require("./controllers");

const router = express.Router();

router.get("/api", getApiStatus);

router.get("/api/health", getHealthStatus);

module.exports = router;
