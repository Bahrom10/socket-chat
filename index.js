const express = import("express");
const cors = import("cors");
const fs = import("fs");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/messages", (req, res) => {
  try {
    const rawdata = fs.readFileSync("./data/messages.json");
    const messages = JSON.parse(rawdata);
    res.send(messages);
  } catch (err) {
    console.error("Error reading messages.json:", err);
    res.status(500).send({ error: "Failed to read messages." });
  }
});

app.post("/messages", (req, res) => {
    try {
      const { sender, text, date } = req.body;
      if (!sender || !text || !date) {
        return res.status(400).send({ error: "Missing required fields" });
      }
      const rawdata = fs.readFileSync("./data/messages.json");
      const messages = JSON.parse(rawdata);
      messages.push({ sender, text, date });
      fs.writeFileSync("./data/messages.json", JSON.stringify(messages, null, 2));
      res.send({ sender, text, date });
    } catch (err) {
      console.error("Error processing request:", err);
      res.status(500).send({ error: "Failed to save the message." });
    }
  });

app.put("/messages", (req, res) => {
  try {
    const messages = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).send({ error: "Invalid data format. Expected an array of messages." });
    }

    fs.writeFileSync("./data/messages.json", JSON.stringify(messages, null, 2));
    res.status(200).send({ message: "Messages updated successfully" });
  } catch (err) {
    console.error("Error updating messages.json:", err);
    res.status(500).send({ error: "Failed to update messages." });
  }
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
