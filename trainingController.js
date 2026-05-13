const fs = require("fs");

const saveTraining = async (
  req,
  res
) => {

  try {

    const {
      businessName,
      businessType,
      services,
      pricing,
      faq
    } = req.body;

    const rawData =
      fs.readFileSync(
        "data.json"
      );

    const database =
      JSON.parse(rawData);

    const businessId =
      Date.now().toString();

    const businessProfile = {

      businessId,

      businessName,

      businessType,

      services,

      pricing,

      faq

    };

    database.businesses.push(
      businessProfile
    );

    fs.writeFileSync(

      "data.json",

      JSON.stringify(
        database,
        null,
        2
      )

    );

    res.json({

      success: true,

      businessId,

      business:
        businessProfile

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false

    });

  }
};

module.exports = {
  saveTraining
};
