# Slack Connect - Modern Slack Integration Platform

A modern, full-stack application for seamless Slack workspace integration and message management. Built with TypeScript, React, and Node.js.

## 🚀 Features

- **Real-time Slack Integration**: Connect and manage multiple Slack workspaces
- **Message Scheduling**: Schedule messages to be sent at specific times
- **Team Collaboration**: Share and manage messages across teams
- **Modern UI/UX**: Clean, responsive interface built with React and Tailwind CSS
- **Type Safety**: Full TypeScript support across frontend and backend
- **RESTful API**: Clean, well-documented API endpoints

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** for beautiful, accessible components
- **React Router** for client-side routing
- **TanStack Query** for data fetching and caching

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **SQLite** with Sequelize ORM
- **CORS** enabled for cross-origin requests
- **JWT** authentication
- **Node-cron** for scheduled tasks

## 📁 Project Structure

```
slack-connect/
├── backend/
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── config.ts        # Configuration
│   │   └── app.ts          # Express app
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/           # Utilities
│   │   └── App.tsx         # Main app component
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rjgrv/slack-connect.git
   cd slack-connect
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the backend directory:
   ```env
   PORT=3001
   DATABASE_URL=sqlite:./db.sqlite
   JWT_SECRET=your-secret-key
   SLACK_CLIENT_ID=your-slack-client-id
   SLACK_CLIENT_SECRET=your-slack-client-secret
   ```

5. **Initialize the database**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

## 🎯 Usage

### Development Mode

- **Backend**: Runs on `http://localhost:3001`
- **Frontend**: Runs on `http://localhost:5173`

### API Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/slack/connect` - Connect Slack workspace

#### Messages
- `GET /messages` - Get all messages
- `POST /messages` - Create new message
- `PUT /messages/:id` - Update message
- `DELETE /messages/:id` - Delete message
- `GET /messages/scheduled` - Get scheduled messages

## 🏗️ Architectural Overview

### OAuth & Token Management
- **Slack OAuth 2.0 Flow**: Secure authentication using Slack's OAuth 2.0 with PKCE
- **Token Storage**: Encrypted storage of Slack tokens in SQLite with user-scoped access
- **Token Refresh**: Automatic token refresh mechanism before expiration
- **Scope Management**: Granular permission handling with least-privilege principle
- **Session Management**: JWT-based sessions with configurable expiration

### Scheduled Task Handling
- **Cron-based Scheduler**: Node-cron for reliable message scheduling
- **Queue System**: Redis-compatible queue for handling high-volume scheduling
- **Retry Logic**: Exponential backoff for failed message deliveries
- **Dead Letter Queue**: Failed messages are captured for manual review
- **Timezone Support**: Full timezone handling with user preferences

### Security Architecture
- **Token Encryption**: AES-256 encryption for stored tokens
- **Rate Limiting**: Express-rate-limit for API protection
- **CORS Configuration**: Strict CORS policies for cross-origin requests
- **Input Validation**: Zod schemas for all API inputs
- **SQL Injection Prevention**: Parameterized queries throughout

## 🎓 Challenges & Learnings

### Challenge 1: Slack Rate Limits
**Problem**: Slack's rate limiting (1 message/second) caused scheduling delays
**Solution**: Implemented a distributed queue system with rate-aware batching
**Learning**: Importance of understanding third-party API limitations early in design

### Challenge 2: Token Security
**Problem**: Storing Slack tokens securely while maintaining accessibility
**Solution**: Implemented encryption-at-rest with environment-based key rotation
**Learning**: Balancing security with user experience in token management

### Challenge 3: Timezone Complexity
**Problem**: Users in different timezones scheduling messages
**Solution**: Built a timezone-aware scheduling system with DST handling
**Learning**: Timezone handling is more complex than initially anticipated

### Challenge 4: Real-time Updates
**Problem**: Keeping frontend updated with message status changes
**Solution**: Implemented polling with React Query + optimistic updates
**Learning**: Sometimes simple solutions outperform complex real-time systems

### Challenge 5: OAuth Flow UX
**Problem**: Users getting lost in OAuth redirect flow
**Solution**: Added clear progress indicators and error handling
**Learning**: OAuth UX requires careful attention to user guidance

## 🔧 Development Tips

### Debugging OAuth Issues
1. Check redirect URLs in Slack app settings
2. Verify environment variables are set correctly
3. Use browser dev tools to trace OAuth flow
4. Check server logs for token exchange errors

### Testing Scheduled Messages
1. Use short intervals (1-2 minutes) for testing
2. Check cron job logs in backend console
3. Verify message appears in Slack test channel
4. Test timezone changes with system clock

### Performance Optimization
1. Use React Query's caching effectively
2. Implement proper pagination for message lists
3. Consider Redis for production queue management
4. Monitor memory usage with large message volumes

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to any Node.js hosting service:
- Railway
- Heroku
- DigitalOcean
- AWS

### Frontend Deployment
The frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Slack API](https://api.slack.com/) for providing excellent documentation
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Vite](https://vitejs.dev/) for fast development experience

---

