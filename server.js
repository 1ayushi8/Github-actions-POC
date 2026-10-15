const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || 'v1';

// Main endpoint
app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const userData = await response.json();
    
    res.json({
      message: "Zero-Downtime POC Response",
      version: VERSION,
      timestamp: new Date().toISOString(),
      fetchedData: userData
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch external API data" });
  }
});

// Required for Docker Health Checks
app.get('/health', (req, res) => {
  res.status(200).json({ status: "UP", version: VERSION });
});

const server = app.listen(PORT, () => {
  console.log(`[${VERSION}] Server running on port ${PORT}`);
});

// Graceful Shutdown: Handle termination signal without dropping active requests
process.on('SIGTERM', () => {
  console.log(`[${VERSION}] SIGTERM signal received: closing HTTP server gracefully...`);
  server.close(() => {
    console.log(`[${VERSION}] HTTP server closed. Exiting process.`);
    process.exit(0);
  });
});
