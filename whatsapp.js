const fs = require("fs");

const qrcode = require(
  "qrcode-terminal"
);

const OpenAI = require("openai");

const {
  Client,
  LocalAuth
} = require(
  "whatsapp-web.js"
);

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY
});

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

    try {

      const rawData =
        fs.readFileSync(
          "data.json"
        );

      const trainingData =
        JSON.parse(rawData);

      const business =
        trainingData[0];

      if (!business) {

        return message.reply(
          "AI is not trained yet."
        );
      }

      const prompt = `
You are a professional AI employee for this business.

Business Name:
${business.businessName}

Business Type:
${business.businessType}

Services:
${business.services}

Pricing:
${business.pricing}

FAQ:
${business.faq}

Customer Message:
${message.body}

Reply professionally.
`;

      const completion =
        await openai.chat.completions.create({

          model: "gpt-4.1-mini",

          messages: [
            {
              role: "user",
              content: prompt
            }
          ]

        });

      const aiReply =
        completion.choices[0]
        .message.content;

      await message.reply(
        aiReply
      );

    } catch (error) {

      console.log(error);

      message.reply(
        "AI error occurred."
      );
    }
  }
);

client.initialize();
