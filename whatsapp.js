const qrcode = require(
  "qrcode-terminal"
);

const {
  Client,
  LocalAuth
} = require(
  "whatsapp-web.js"
);

const client = new Client({

  authStrategy:
    new LocalAuth()

});

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
      "Scan QR Code"
    );
  }
);

client.on(
  "ready",
  () => {

    console.log(
      "WhatsApp Connected"
    );
  }
);

client.on(
  "message",
  async (message) => {

    console.log(
      "Message:",
      message.body
    );

    message.reply(
      "Hello 👋 AI Employee is active."
    );
  }
);

client.initialize();
