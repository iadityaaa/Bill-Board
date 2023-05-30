const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors()); // Enable CORS for all routes

// Endpoint to fetch stock data
app.get('/api/stock-data', async (req, res) => {
  try {
    const { symbol } = req.query;
    const apiKey = 'O9LP7NXCN5I5U8R9'; // Replace with your actual API key

    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`
    );

    // Process the response and extract the required data
    const { data } = response;
    const timeSeries = data['Time Series (Daily)'];
    const date = '2023-05-15'; // Specify the desired date
    const dataForDate = timeSeries[date];
    const { '1. open': open, '4. close': close, '2. high': high, '3. low': low } = dataForDate;
    const stockData = { symbol, open, close, high, low };

    res.json(stockData);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
