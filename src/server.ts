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

// ===== Root Route =====
app.get("/", (req, res) => {
  res.send(`<!doctype html>
<html>
  <head>
    <title>API</title>
    <style>
      html,
      body {
        height: 100%;
        margin: 0;
      }
      .center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 30px;
        color: silver;
        font-family: Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <div class="center">API VERSION 1.0</div>
  </body>
</html>`);
});

app.use("/api", MainRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
