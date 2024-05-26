const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/scrape-website', async (req, res) => {
  const { zipcode } = req.body;
  if (zipcode) {
    try {
      const url = `https://weather.com/weather/today/l/${zipcode}`;
      // Fetch HTML content from the website
      const response = await axios.get(url);
      const html = response.data;
  
      // Use Cheerio to load the HTML content
      const $ = cheerio.load(html);
  
      // Extract the specific element using its class
      const location = $('.CurrentConditions--location--1YWj_').text();
      const time = $('.CurrentConditions--timestamp--1ybTk').text();
      const temp = $('.CurrentConditions--tempValue--MHmYY').text();
      const warn = $('.CurrentConditions--phraseValue--mZC_p').text();

  
      // Send the extracted location as a response
      res.status(200).json({ location, time, temp,warn });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ message: 'Error fetching data' });
    }
  } else {
    res.status(400).json({ message: 'Zipcode is required' });
  }
});

app.listen(3100, () => {
  console.log('Listening on port 3100');
});
