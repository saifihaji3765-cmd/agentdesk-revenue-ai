const express = require("express");

const routes = require("./routes");

const app = express();

app.use(express.json());

app.use(routes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "AgentDesk Revenue AI",
    status: "Live"
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
