import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import { MainRouter } from "./routers/index";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== CORS MUST BE BEFORE ROUTES =====
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const __dirname = path.resolve();

// ===== Serve Public Folder =====
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.use("/api", MainRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
