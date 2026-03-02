import "dotenv/config";
import express from "express";
import { MainRouter } from "./routers/index.ts";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========== Serve public folder ===========
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));

// =========== Root Router ===========
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// =========== Main Router ===========
app.use("/api", MainRouter);

app.listen(PORT, () => {
  console.log(`Server running on 🗿 http://localhost:${PORT}`);
});
