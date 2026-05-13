const {
  Client,
  LocalAuth
} = require(
  "whatsapp-web.js"
);

const QRCode = require(
  "qrcode"
);

const clients = {};

const qrCodes = {};

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

          qr:
            qrCodes[businessId] || null,

          message:
            "Session already exists"

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
        async (qr) => {

          const qrImage =
            await QRCode.toDataURL(
              qr
            );

          qrCodes[
            businessId
          ] = qrImage;

          console.log(
            `QR Ready: ${businessId}`
          );
        }
      );

      client.on(
        "ready",
        () => {

          qrCodes[
            businessId
          ] = null;

          console.log(
            `WhatsApp Connected: ${businessId}`
          );
        }
      );

      client.initialize();

      setTimeout(() => {

        res.json({

          success: true,

          qr:
            qrCodes[
              businessId
            ] || null

        });

      }, 4000);

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
