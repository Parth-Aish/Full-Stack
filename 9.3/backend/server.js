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