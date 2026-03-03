import "dotenv/config";
import express from "express";
import path from "path";
import { MainRouter } from "./routers/index";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();

// Serve public folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.use("/api", MainRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
