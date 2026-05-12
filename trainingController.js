const trainingData = [];

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

    const businessProfile = {
      id: Date.now(),
      businessName,
      businessType,
      services,
      pricing,
      faq
    };

    trainingData.push(businessProfile);

    res.json({
      success: true,
      message: "AI training saved",
      data: businessProfile
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};

module.exports = {
  saveTraining
};
