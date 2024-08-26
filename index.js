const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/messages", (req, res) => {
  const rawdata = fs.readFileSync("./data/messages.json");
  const messages = JSON.parse(rawdata);
  res.send({ messages });
});

app.post("/messages", (req, res) => {
  const { sender ,text, date } = req.body;

  const rawdata = fs.readFileSync("./data/messages.json");
  const messages = JSON.parse(rawdata);
  messages.push({ sender, text, date });
  console.log(messages);
  console.log(rawdata);

  messages.push({ title, text, image, type });
  fs.writeFileSync("./data/messages.json", JSON.stringify(messages));

  res.send({ sender, text, date });
});

app.put("/messages", (req, res) => {
  const messages = req.body

  fs.writeFileSync("./data/messages.json", JSON.stringify(messages, null, 2));

  res.status(200).send({message: "Все готово"})
})

app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
