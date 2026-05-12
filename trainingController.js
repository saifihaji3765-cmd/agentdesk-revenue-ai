const fs = require("fs");

const saveTraining = async (req, res) => {

  try {

    const {
      businessName,
      businessType,
      services,
      pricing,
      faq
    } = req.body;

    if (
      !businessName ||
      !businessType
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing fields"
      });
    }

    const rawData = fs.readFileSync(
      "data.json"
    );

    const trainingData =
      JSON.parse(rawData);

    const businessProfile = {
      id: Date.now(),
      businessName,
      businessType,
      services,
      pricing,
      faq
    };

    trainingData.push(
      businessProfile
    );

    fs.writeFileSync(
      "data.json",
      JSON.stringify(
        trainingData,
        null,
        2
      )
    );

    res.json({
      success: true,
      message:
        "AI training saved successfully",
      data: businessProfile
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};

module.exports = {
  saveTraining
};
