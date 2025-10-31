import os
import subprocess
import shutil

# --- Project Configuration ---
PROJECT_NAME = "9.3"

# --- Backend: package.json ---
BACKEND_PACKAGE_JSON = """
{
  "name": "backend",
  "version": "1.0.0",
  "description": "Backend server for 9.3",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2"
  }
}
"""

# --- Backend: server.js ---
BACKEND_SERVER_JS = """
const express = require('express');
const cors = require('cors');
const os = require('os'); // Will use this to show which instance is serving

const app = express();
const PORT = 8080;

// Enable CORS for all routes
app.use(cors());

// A simple health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

/**
 * @route   GET /api/data
 * @desc    Returns a message and the server's hostname.
 * This proves the load balancer is working by showing
 * different hostnames on refresh.
 */
app.get('/api/data', (req, res) => {
  console.log('Request received for /api/data');
  res.json({
    message: 'Hello from the Full-Stack Backend!',
    instance: os.hostname(),
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`This instance is: ${os.hostname()}`);
});
"""

# --- Frontend: package.json ---
FRONTEND_PACKAGE_JSON = """
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  },
  "eslintConfig": {
    "extends": [ "react-app" ]
  },
  "browserslist": {
    "production": [ ">0.2%", "not dead", "not op_mini all" ],
    "development": [ "last 1 chrome version", "last 1 firefox version" ]
  },
  "proxy": "http://localhost:8080"
}
"""

# --- Frontend: public/index.html ---
FRONTEND_PUBLIC_HTML = """
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Full Stack AWS App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
"""

# --- Frontend: src/App.css ---
FRONTEND_APP_CSS = """
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f4f7f6;
  color: #333;
  margin: 0;
  padding: 0;
}

.App {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.App-header {
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 20px;
  margin-bottom: 30px;
}

.App-header h1 {
  color: #0052cc;
  margin: 0;
}

button {
  background-color: #0052cc;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

button:hover {
  background-color: #0041a3;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

.response-container {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  text-align: left;
  border: 1px solid #e0e0e0;
}

.response-container pre {
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.error {
  color: #d9534f;
  font-weight: bold;
}
"""

# --- Frontend: src/App.js ---
FRONTEND_APP_JS = """
import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      // In production, this '/api/data' path will be routed by the
      // AWS Application Load Balancer to the backend.
      // In local dev, the 'proxy' in package.json handles this.
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Full-Stack AWS App with Load Balancing</h1>
      </header>
      
      <p>Click the button to fetch data from the backend.</p>
      
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data from Backend'}
      </button>

      <div className="response-container">
        {loading && <p>Contacting backend server...</p>}
        
        {error && (
          <div>
            <p className="error">Error fetching data:</p>
            <pre>{error}</pre>
          </div>
        )}
        
        {data && (
          <div>
            <p><strong>Success! Got data from the backend:</strong></p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <p>Check the <strong>"instance"</strong> field. If you refresh and click again, you might see it change!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
"""

# --- Frontend: src/index.js ---
FRONTEND_INDEX_JS = """
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
"""

# --- Root README.md ---
README_MD = """
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
"""

# --- Main Script Function ---
def create_project():
    print(f"--- Creating project '{PROJECT_NAME}'... ---")
    
    if os.path.exists(PROJECT_NAME):
        print(f"--- Removing existing '{PROJECT_NAME}' directory... ---")
        shutil.rmtree(PROJECT_NAME)
        
    # 1. Create directory structure
    project_dir = os.path.abspath(PROJECT_NAME)
    backend_dir = os.path.join(project_dir, 'backend')
    frontend_dir = os.path.join(project_dir, 'frontend')
    frontend_public_dir = os.path.join(frontend_dir, 'public')
    frontend_src_dir = os.path.join(frontend_dir, 'src')
    
    os.makedirs(backend_dir, exist_ok=True)
    os.makedirs(frontend_public_dir, exist_ok=True)
    os.makedirs(frontend_src_dir, exist_ok=True)
    print("--- Directory structure created. ---")

    def write_file(path, content):
        try:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content.strip())
            print(f"--- Created {os.path.relpath(path)} ---")
        except IOError as e:
            print(f"Error writing file {path}: {e}")

    # 3. Create all files
    # Root
    write_file(os.path.join(project_dir, 'README.md'), README_MD)

    # Backend
    write_file(os.path.join(backend_dir, 'package.json'), BACKEND_PACKAGE_JSON)
    write_file(os.path.join(backend_dir, 'server.js'), BACKEND_SERVER_JS)

    # Frontend
    write_file(os.path.join(frontend_dir, 'package.json'), FRONTEND_PACKAGE_JSON)
    write_file(os.path.join(frontend_public_dir, 'index.html'), FRONTEND_PUBLIC_HTML)
    write_file(os.path.join(frontend_src_dir, 'App.css'), FRONTEND_APP_CSS)
    write_file(os.path.join(frontend_src_dir, 'App.js'), FRONTEND_APP_JS)
    write_file(os.path.join(frontend_src_dir, 'index.js'), FRONTEND_INDEX_JS)
    
    print(f"\n✅ --- Project '{PROJECT_NAME}' created successfully! --- ✅")
    print("\nNext steps:")
    print("1. Read the `9.3/README.md` file for local development.")
    print("2. When ready, follow the `DEPLOY_GUIDE_AWS.md` file for deployment.")

# --- Run the script ---
if __name__ == "__main__":
    create_project()
