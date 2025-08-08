import cron from "node-cron";
import { getDB } from "./db";
import { sendSlackMessage } from "./slack";

// runs every minute to check for messages to send
export function initScheduler() {
  cron.schedule("* * * * *", async () => {
    const db = getDB();
    const now = Math.floor(Date.now() / 1000);

    const messages = await db.all(
      `SELECT * FROM scheduled_messages WHERE status = 'pending' AND post_at <= ?`,
      [now]
    );
    for (const msg of messages) {
      try {
        await sendSlackMessage(msg.team_id, msg.channel, msg.message);
        await db.run(
          `UPDATE scheduled_messages SET status = 'sent' WHERE id = ?`,
          [msg.id]
        );
      } catch (err) {
        // Optionally: add retry/error status
        await db.run(
          `UPDATE scheduled_messages SET status = 'failed' WHERE id = ?`,
          [msg.id]
        );
        console.error("Failed to send scheduled message", msg, err);
      }
    }
  });
}
