const get = (req, res) => {
    try {
        const rawdata = fs.readFileSync("./data/messages.json");
        const messages = JSON.parse(rawdata);
        res.send(messages);
    } catch (err) {
        console.error("Error reading messages.json:", err);
        res.status(500).send({ error: "Failed to read messages." });
    }
};

const post = (req, res) => {
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
};
const put = (req, res) => {
    try {
        const messages = JSON.parse(req.body);
        if (!messages) {
            return res.status(400).send({ error: "Missing required fields" });
        }
        fs.writeFileSync("./data/messages.json", JSON.stringify(messages));
        res.send(messages);
    } catch (err) {
        console.error("Error processing request:", err);
        res.status(500).send({ error: "Failed to save the message." });
    }
};

export { get, post, put };
