import dotenv from "dotenv";
dotenv.config();

export const config = {
  slack: {
    clientId: process.env.SLACK_CLIENT_ID || "9317562690453.9334316768929",
    clientSecret: process.env.SLACK_CLIENT_SECRET || "309992b2b055bad25dbe77623ed78307",
    redirectUri: process.env.SLACK_REDIRECT_URI || "https://1251a9e8a579.ngrok-free.app",
  },
  port: process.env.PORT || 3001,
};
