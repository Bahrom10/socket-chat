import { get, post } from "/src/routes/router"

const express = import("express");
const cors = import("cors");
const fs = import("fs");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/messages", get);

app.post("/messages", post);

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

app.options('/messages', (req, res) => {
  const sender = req.query.sender; // Accessing the query parameter 'sender'
  const date = req.query.date;     // Accessing the query parameter 'date'
  res.send(`Sender: ${sender}, Date: ${date}`);
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
