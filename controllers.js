const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const getApiStatus = (req, res) => {
  res.json({
    success: true,
    message: "AgentDesk API Running"
  });
};

const getHealthStatus = (req, res) => {
  res.json({
    status: "healthy",
    server: "online"
  });
};

const generateProposal = async (req, res) => {
  try {
    const {
      clientName,
      businessType,
      projectType,
      budget
    } = req.body;

    const prompt = `
Generate a professional business proposal.

Client Name: ${clientName}
Business Type: ${businessType}
Project Type: ${projectType}
Budget: ${budget}

The proposal should include:
- Introduction
- Project Understanding
- Services Offered
- Timeline
- Pricing Overview
- Closing Statement
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional business proposal generator."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    });

    const proposal =
      response.choices[0].message.content;

    res.json({
      success: true,
      proposal
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI proposal generation failed"
    });
  }
};

module.exports = {
  getApiStatus,
  getHealthStatus,
  generateProposal
};
