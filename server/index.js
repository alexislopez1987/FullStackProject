'use strict';

require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var cors = require('cors');

const app = express();

const corsOptions = {
  exposedHeaders: 'auth-token',
};

app.use(cors(corsOptions));

require('./api/models/Item');
require('./api/models/User');

const routes = require('./api/routes/routes');

const loadData = require('./api/data/loadData');

const PORT = process.env.NODE_PORT || 8080;
const HOST = '0.0.0.0';

mongoose.Promise = global.Promise;

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
  mongoose.connect(`mongodb://${process.env.DBHOST}:${process.env.DBPORT}/PersonalFinancesDB`, options).then(() => {
    console.log('MongoDB is connected');
    loadData.loadData();
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
app.use(morgan('combined'));

app.use('/api/v1', routes);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);