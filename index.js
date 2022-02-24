require('dotenv').config();

const express = require('express');

const app = express();

CLIENT_ID = process.env.CLIENT_ID;
CLIENT_SECRET = process.env.CLIENT_SECRET;
REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/login', (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  );
});

const port = 8888;

app.listen(port, () => {
  console.log(`Express running at port ${port}`);
});
