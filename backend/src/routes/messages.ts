import express from "express";
import { getDB } from "../services/db";
import { sendSlackMessage, getValidAccessToken } from "../services/slack";

const router = express.Router();

// Immediate send
router.post("/send", async (req, res) => {
  const { team_id, channel, message } = req.body;
  if (!team_id || !channel || !message)
    return res.status(400).json({ error: "Missing params" });
  try {
    await sendSlackMessage(team_id, channel, message);
    res.json({ sent: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Schedule
router.post("/schedule", async (req, res) => {
  const { team_id, channel, message, post_at } = req.body;
  if (!team_id || !channel || !message || !post_at)
    return res.status(400).json({ error: "Missing params" });

  // post_at in ISO or epoch; convert to epoch seconds
  const postAtEpoch =
    typeof post_at === "number"
      ? post_at
      : Math.floor(new Date(post_at).getTime() / 1000);

  try {
    const db = getDB();
    await db.run(
      `INSERT INTO scheduled_messages (team_id, channel, message, post_at) VALUES (?, ?, ?, ?)`,
      [team_id, channel, message, postAtEpoch]
    );
    res.json({ scheduled: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// List
router.get("/scheduled", async (req, res) => {
  const { team_id } = req.query;
  if (!team_id) return res.status(400).json({ error: "Missing team_id" });
  try {
    const db = getDB();
    const messages = await db.all(
      `SELECT * FROM scheduled_messages WHERE team_id = ? AND status = 'pending'`,
      [team_id]
    );
    res.json(messages);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Cancel
router.post("/scheduled/cancel", async (req, res) => {
  const { id, team_id } = req.body;
  if (!id || !team_id)
    return res.status(400).json({ error: "Missing id or team_id" });
  try {
    const db = getDB();
    await db.run(
      `UPDATE scheduled_messages SET status = 'cancelled' WHERE id = ? AND team_id = ? AND status = 'pending'`,
      [id, team_id]
    );
    res.json({ cancelled: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
