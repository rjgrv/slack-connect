import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
/**
 * Redirects user to backend Slack OAuth route
 */
export function connectSlack() {
  window.location.href = "https://1251a9e8a579.ngrok-free.app/auth/slack";
  // If using ngrok, replace with your ngrok HTTPS URL
  // window.location.href = "https://your-ngrok-url/api/slack/connect";
}

/**
 * Send a Slack message immediately
 */
export async function sendSlackMessage(team_id: string, channel: string, message: string) {
  const res = await fetch("http://localhost:3001/api/messages/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ team_id, channel, message }),
  });
  return res.json();
}

/**
 * Schedule a Slack message
 */
export async function scheduleSlackMessage(team_id: string, channel: string, message: string, post_at: string | number) {
  const res = await fetch("http://localhost:3001/api/messages/schedule", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ team_id, channel, message, post_at }),
  });
  return res.json();
}

/**
 * List scheduled Slack messages
 */
export async function getScheduledMessages(team_id: string) {
  const res = await fetch(`http://localhost:3001/api/messages/scheduled?team_id=${team_id}`);
  return res.json();
}

/**
 * Cancel a scheduled Slack message
 */
export async function cancelScheduledMessage(id: string, team_id: string) {
  const res = await fetch("http://localhost:3001/api/messages/scheduled/cancel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, team_id }),
  });
  return res.json();
}

/**
 * Fetch Slack user info (profile, avatar, etc.)
 */
export async function getSlackUserInfo() {
  const res = await fetch("http://localhost:3001/api/slack/user");
  return res.json();
}

/**
 * Fetch Slack channels for the connected workspace
 */
export async function getSlackChannels() {
  const res = await fetch("http://localhost:3001/api/slack/channels");
  return res.json();
}
