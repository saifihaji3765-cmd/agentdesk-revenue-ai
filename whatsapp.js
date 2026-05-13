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

const followupSent = {};

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

      const lowerMessage =
        message.body.toLowerCase();

      const triggerWords = [

        "price",
        "interested",
        "buy",
        "booking",
        "appointment"

      ];

      const isHotLead =
        triggerWords.some(
          (word) =>
            lowerMessage.includes(
              word
            )
        );

      if (isHotLead) {

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

        const rawAlerts =
          fs.readFileSync(
            "alerts.json"
          );

        const alerts =
          JSON.parse(rawAlerts);

        alerts.push({

          id: Date.now(),

          phone:
            message.from,

          message:
            message.body,

          status:
            "HOT LEAD"

        });

        fs.writeFileSync(
          "alerts.json",

          JSON.stringify(
            alerts,
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

Your goals:
- Reply professionally
- Capture leads
- Convert customers
- Encourage booking
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

      if (
        !followupSent[userId]
      ) {

        followupSent[userId] =
          true;

        setTimeout(
          async () => {

            try {

              await client.sendMessage(

                userId,

                `Hello 👋

Just checking if you are still interested.

Let me know if you would like more details.`

              );

            } catch (error) {

              console.log(error);

            }

          },

          7200000
        );
      }

    } catch (error) {

      console.log(error);

      message.reply(
        "AI error occurred."
      );
    }
  }
);

client.initialize();
