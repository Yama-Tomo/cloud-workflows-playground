const express = require('express');
const app = express();

const workerPath = '/worker';

app.get(workerPath, async (req, res) => {
  const min = 1;
  const max = 5;
  const rand = Math.floor(Math.random() * (max + 1 - min)) + min;
  console.log(req.query, `wait ${rand * 1000}ms`);

  await new Promise(r => setTimeout(r, rand * 1000));

  res.send(`worker query:[${JSON.stringify(req.query)}]`);
});

app.get('/queue', (req, res) => {
  const proto = req.headers['x-forwarded-proto'] || req.protocol;
  const createQueue = (seq) => ({
    url: `${proto}://${req.headers.host}${workerPath}`,
    query: { seq },
  });

  const queue = [
    [createQueue('1'), createQueue('2'), createQueue('3')],
    [createQueue('4')],
    [createQueue('5'), createQueue('6'), createQueue('7')],
  ];
  res.send(queue);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
