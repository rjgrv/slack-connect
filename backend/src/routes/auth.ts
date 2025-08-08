import express from "express";
import { config } from "../config";
import { exchangeCodeForToken, saveTokens } from "../services/slack";

const router = express.Router();

router.get("/slack", (req, res) => {
  const q = new URLSearchParams({
    client_id: config.slack.clientId,
    scope: "chat:write,channels:read,channels:history,groups:read,im:read,mpim:read",
    redirect_uri: config.slack.redirectUri,
  });
  res.redirect("https://slack.com/oauth/v2/authorize?" + q.toString());
});

// callback from Slack
router.get("/slack/callback", async (req, res) => {
  const code = req.query.code as string;
  if (!code) return res.status(400).send("Missing code");

  try {
    const tokens = await exchangeCodeForToken(code);
    await saveTokens(
      tokens.team_id,
      tokens.access_token,
      tokens.refresh_token || null,
      tokens.expires_in
    );
    res.send("Slack workspace connected! You may close this tab.");
  } catch (e: any) {
    res.status(500).send(e.message || "OAuth error");
  }
});

export default router;
