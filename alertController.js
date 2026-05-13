const fs = require("fs");

const getAlerts = async (
  req,
  res
) => {

  try {

    const rawData =
      fs.readFileSync(
        "alerts.json"
      );

    const alerts =
      JSON.parse(rawData);

    res.json({
      success: true,
      alerts
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};

module.exports = {
  getAlerts
};
