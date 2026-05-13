const {
  Client,
  LocalAuth
} = require(
  "whatsapp-web.js"
);

const qrcode = require(
  "qrcode-terminal"
);

const clients = {};

const connectWhatsApp =
  async (req, res) => {

    try {

      const {
        businessId
      } = req.body;

      if (
        clients[businessId]
      ) {

        return res.json({

          success: true,

          message:
            "WhatsApp already connected"

        });
      }

      const client =
        new Client({

          authStrategy:
            new LocalAuth({
              clientId:
                businessId
            })

        });

      clients[businessId] =
        client;

      client.on(
        "qr",
        (qr) => {

          qrcode.generate(
            qr,
            {
              small: true
            }
          );

          console.log(
            `Scan QR for ${businessId}`
          );
        }
      );

      client.on(
        "ready",
        () => {

          console.log(
            `WhatsApp Connected: ${businessId}`
          );
        }
      );

      client.initialize();

      res.json({

        success: true,

        message:
          "WhatsApp session started. Scan QR in terminal."

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
  connectWhatsApp
};
