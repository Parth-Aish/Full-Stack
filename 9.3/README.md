# Project 9.3: Full-Stack App for AWS Deployment

This project contains a simple full-stack application designed to be deployed to AWS with a load balancer.

- `/backend`: A Node.js + Express server that runs on port 8080 and serves data from `/api/data`.
- `/frontend`: A React application that fetches data from the backend.

## Local Development

You can run both apps locally.

**1. Run the Backend:**
```bash
cd backend
npm install
npm start
# Server will run on http://localhost:8080
```

**2. Run the Frontend (in a separate terminal):**
```bash
cd frontend
npm install
npm start
# App will open on http://localhost:3000
```

The frontend's `package.json` includes a `"proxy": "http://localhost:8080"` entry, so any requests to `/api/data` from the React app will be automatically forwarded to your local backend.

## Production Deployment

Do not run `npm start` in production. Follow the `DEPLOY_GUIDE_AWS.md` for full deployment instructions.