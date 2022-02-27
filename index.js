require('dotenv').config();

const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const { query, response } = require('express');

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

app.get('/callback', (req, res) => {
  const code = req.query.code || null;
  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString('base64')}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
        });
        res.redirect(`http://localhost:3000/?${queryParams}`);
        //     const { access_token, token_type } = response.data;

        //     axios
        //       .get('https://api.spotify.com/v1/me', {
        //         headers: {
        //           Authorization: `${token_type} ${access_token}`,
        //         },
        //       })
        //       .then((response) =>
        //         res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`)
        //       );
        //   } else {
        //     res.send(response);
        //   }
        // })
        // .catch((err) => {
        //   res.send(err);
        // });

        // const { refresh_token } = response.data;

        // axios
        //   .get(
        //     `http://localhost:8888/refresh_token?refresh_token=${refresh_token}`
        //   )
        //   .then((response) => {
        //     res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
        //   })
        //   .catch((error) => {
        //     res.send(error);
        //   });
      } else {
        res.send(response);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get('/refresh_token', (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString('base64')}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

const port = 8888;

app.listen(port, () => {
  console.log(`Express running at port ${port}`);
});
