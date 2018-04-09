const express = require('express');
const bodyParset = require('body-parser');

const app = express();

app.use(bodyParset.json());

app.get('/', (req, res) => res.send('Hello, Express.js'));
app.get('/hello', (req, res) => res.send('Hello stranger!'));
app.get('/hello/:name', (req, res) => res.send('Hello, ' + req.params.name));
app.all('/sub/*', (req, res) => {
  res.send(`You requested URI: ${req.protocol}://${req.get('host') + req.originalUrl}`);
});

const middleware = (req, res, next) => {
  if (req.get("Header") === 'Key') {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.post('/post', middleware, (req, res) => {
  if (Object.keys(req.body).length != 0) {
    res.json(req.body);
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => console.log('Server has been run on 3000 port'));
