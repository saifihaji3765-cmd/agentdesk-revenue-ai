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

const chatMemory = {};

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

      const userId =
        message.from;

      if (!chatMemory[userId]) {

        chatMemory[userId] = [];
      }

      chatMemory[userId].push({
        role: "user",
        content: message.body
      });

      if (
        message.body
          .toLowerCase()
          .includes("price")
      ) {

        const rawLeads =
          fs.readFileSync(
            "leads.json"
          );

        const leads =
          JSON.parse(rawLeads);

        leads.push({

          id: Date.now(),

          phone:
            message.from,

          message:
            message.body

        });

        fs.writeFileSync(
          "leads.json",

          JSON.stringify(
            leads,
            null,
            2
          )
        );
      }

      const systemPrompt = `
You are a professional AI employee.

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

Your goal:
- Reply professionally
- Capture leads
- Ask for customer details
- Encourage conversion
`;

      const completion =
        await openai.chat.completions.create({

          model: "gpt-4.1-mini",

          messages: [

            {
              role: "system",
              content: systemPrompt
            },

            ...chatMemory[userId]

          ]

        });

      const aiReply =
        completion.choices[0]
        .message.content;

      chatMemory[userId].push({

        role: "assistant",
        content: aiReply

      });

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
