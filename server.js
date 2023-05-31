const bodyParser = require('body-parser');
const express = require('express');

const path = require('path');

const DB = require('./server/database');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

// Define routing for static resources (like frontend files)
app.use('/public', express.static(path.resolve('./public')));

// Ensure API endpoints not treated as static routing
app.use('/', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  return express.static(path.resolve('./public'))(req, res, next);
});

// Define API endpoints to retrieve menu
app.get('/api/restaurant/:restaurantId/menu', (req, res) => {
  DB.selectFromTable('restaurants', { restaurant: req.params.restaurantId })
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        error:   err.name,
        message: err.message
      });
    });
});

DB.connect(() => {
  app.listen(PORT, () => {
    console.log(`Server has been started: http://127.0.0.1:${PORT} ...`);
  });
});