const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "AgentDesk Revenue AI",
    message: "Server Running Successfully"
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
