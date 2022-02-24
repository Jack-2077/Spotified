require('dotenv').config();

const express = require('express');
const querystring = require('querystring');

const app = express();

CLIENT_ID = process.env.CLIENT_ID;
CLIENT_SECRET = process.env.CLIENT_SECRET;
REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/', (req, res) => {
  res.send('Hello World');
});

const randomString = (length) =>
  Math.random()
    .toString(36)
    .substr(2, length)
    .split('')
    .map((e) => (Math.random() < Math.random() ? e.toUpperCase() : e))
    .join()
    .replace(/,/g, '');

const stateKey = 'spotify_auth_state';

app.get('/login', (req, res) => {
  const state = randomString(16);
  res.cookie(stateKey, state);

  let scope = 'user-read-private user-read-email';

  queryParams = querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: scope,
    state,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

const port = 8888;

app.listen(port, () => {
  console.log(`Express running at port ${port}`);
});
