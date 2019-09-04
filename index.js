'use strict';

require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./api/routes/routes');
const Item = require('./api/models/item');

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const app = express();

mongoose.Promise = global.Promise;
//mongoose.connect(`mongodb://${process.env.DBHOST}/PersonalFinancesDB`); 

const options = {
  useNewUrlParser: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: 3, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
}

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  mongoose.connect(`mongodb://${process.env.DBHOST}/PersonalFinancesDB`, options).then(() => {
    console.log('MongoDB is connected')
  }).catch(err => {
    console.error('ERROR!!!');
    console.error(err);
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000);
  })
}

connectWithRetry();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

routes(app);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);