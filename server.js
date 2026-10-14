const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const userData = await response.json();
    
    res.json({
      message: "Hello from GitHub Actions POC App!",
      environment: process.env.NODE_ENV || "development",
      fetchedData: userData
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch external API data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
