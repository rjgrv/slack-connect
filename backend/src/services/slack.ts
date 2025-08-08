import axios from "axios";
import { config } from "../config";
import { getDB } from "./db";

export async function exchangeCodeForToken(code: string) {
  const res = await axios.post("https://slack.com/api/oauth.v2.access", null, {
    params: {
      code,
      client_id: config.slack.clientId,
      client_secret: config.slack.clientSecret,
      redirect_uri: config.slack.redirectUri,
    },
  });
  if (!res.data.ok) throw new Error(res.data.error);

  // Slack enterprise workspaces don’t use refresh tokens (they use rotating tokens)
  const tokens = {
    team_id: res.data.team.id,
    access_token: res.data.access_token,
    refresh_token: res.data.refresh_token, // may be undefined on some plans!
    expires_in: res.data.expires_in || 3600, // usually 3600 seconds
  };
  return tokens;
}

// Save token to DB with expiry
export async function saveTokens(team_id: string, access_token: string, refresh_token: string | null, expires_in: number) {
  const expires_at = Math.floor(Date.now() / 1000) + expires_in - 60; // 60s buffer
  const db = getDB();
  await db.run(
    `INSERT OR REPLACE INTO tokens (team_id, access_token, refresh_token, expires_at) VALUES (?, ?, ?, ?)`,
    [team_id, access_token, refresh_token, expires_at]
  );
}

export async function getToken(team_id: string) {
  const db = getDB();
  return db.get(`SELECT * FROM tokens WHERE team_id = ?`, [team_id]);
}

// Refresh tokens (only if refresh_token exists)
export async function refreshTokenIfExpiring(team_id: string) {
  const token = await getToken(team_id);
  if (!token) return null;

  if (Math.floor(Date.now() / 1000) < token.expires_at) return token.access_token;

  if (!token.refresh_token) throw new Error("No refresh_token available");

  const res = await axios.post("https://slack.com/api/oauth.v2.access", null, {
    params: {
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
      client_id: config.slack.clientId,
      client_secret: config.slack.clientSecret,
    },
  });
  if (!res.data.ok) throw new Error(res.data.error);

  await saveTokens(token.team_id, res.data.access_token, res.data.refresh_token, res.data.expires_in || 3600);
  return res.data.access_token;
}

// Helper to get current valid access token
export async function getValidAccessToken(team_id: string) {
  const token = await getToken(team_id);
  if (!token) throw new Error("No token saved");
  if (Math.floor(Date.now() / 1000) > token.expires_at && token.refresh_token) {
    return await refreshTokenIfExpiring(team_id);
  }
  return token.access_token;
}

// Send message (immediate)
export async function sendSlackMessage(team_id: string, channel: string, text: string) {
  const access_token = await getValidAccessToken(team_id);
  const url = "https://slack.com/api/chat.postMessage";
  const res = await axios.post(
    url,
    { channel, text },
    { headers: { Authorization: `Bearer ${access_token}` } }
  );
  if (!res.data.ok) throw new Error(res.data.error);
  return res.data;
}
