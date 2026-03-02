import "dotenv/config";
import express from "express";
import { MainRouter } from "./routers/index.ts";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from API");
});

app.use("/api", MainRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on 🗿 http://localhost:${PORT}`);
});
