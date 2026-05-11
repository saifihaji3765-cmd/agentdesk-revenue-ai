const getApiStatus = (req, res) => {
  res.json({
    success: true,
    message: "AgentDesk API Running"
  });
};

const getHealthStatus = (req, res) => {
  res.json({
    status: "healthy",
    server: "online"
  });
};

module.exports = {
  getApiStatus,
  getHealthStatus
};
