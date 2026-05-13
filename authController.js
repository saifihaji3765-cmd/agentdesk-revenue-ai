const fs = require("fs");

const loginBusiness =
  async (req, res) => {

    try {

      const {
        businessId
      } = req.body;

      const rawData =
        fs.readFileSync(
          "data.json"
        );

      const database =
        JSON.parse(rawData);

      const business =
        database.businesses.find(

          (item) =>
            item.businessId ===
            businessId

        );

      if (!business) {

        return res.status(404)
          .json({

            success: false,

            message:
              "Business not found"

          });
      }

      res.json({

        success: true,

        business

      });

    } catch (error) {

      console.log(error);

      res.status(500)
        .json({

          success: false

        });

    }
  };

module.exports = {
  loginBusiness
};
