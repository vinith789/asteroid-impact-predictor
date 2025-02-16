const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2025-02-10&end_date=2025-02-17&api_key=${NASA_API_KEY}`;

app.get('/asteroids', async (req, res) => {
    try {
        const response = await axios.get(NASA_API_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
