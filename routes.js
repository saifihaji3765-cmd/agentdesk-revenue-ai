const express = require("express");

const router = express.Router();

router.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "AgentDesk API Running"
  });
});

router.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    server: "online"
  });
});

module.exports = router;
