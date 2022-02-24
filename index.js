const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/test', (req, res) => {
  const { name, fame } = req.query;

  res.send(`Hellooooo ${name} with ${fame}`);
});

const port = 8888;

app.listen(port, () => {
  console.log(`Express running at port ${port}`);
});
