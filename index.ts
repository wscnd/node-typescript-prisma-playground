import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  console.log(req);
  res.json({ hello: "hello" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
