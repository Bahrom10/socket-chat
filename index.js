import { get, post } from "/src/routes/router"

const express = import("express");
const cors = import("cors");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/messages", get);

app.post("/messages", post);


app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
