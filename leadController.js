const fs = require("fs");

const getLeads = async (
  req,
  res
) => {

  try {

    const rawData =
      fs.readFileSync(
        "leads.json"
      );

    const leads =
      JSON.parse(rawData);

    res.json({
      success: true,
      leads
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};

module.exports = {
  getLeads
};
