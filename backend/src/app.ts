import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "./config";
import authRoutes from "./routes/auth";
import messageRoutes from "./routes/messages";
import { initDB } from "./services/db";
import { initScheduler } from "./services/schedular";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);

app.get("/", (req, res) => res.send("Slack Connect Backend is running!"));

// Start server
(async () => {
  await initDB();
  initScheduler();
  app.listen(config.port, () =>
    console.log(`Backend running on http://localhost:${config.port}`)
  );
})();
