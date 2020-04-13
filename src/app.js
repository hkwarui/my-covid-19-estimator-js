const express = require('express');

const path = require('path');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const js2xmlparser = require('js2xmlparser');

const fs = require('fs');


const covid19ImpactEstimator = require('./estimator.js');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'));
app.use(morgan(':method  :url  :status   :response-time ms', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Acess-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});
app.get('/src/index.js', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/index.js`));
});
app.get('/src/estimator.js', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/estimator.js`));
});
app.get('/src/ui.js', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/ui.js`));
});
app.use(express.static(path.join(__dirname, 'public')));

// Get default response
app.get('/api/v1/on-covid-19', (req, res) => {
  const data = req.body;
  const estimate = covid19ImpactEstimator(data);
  res.json({ estimate });
});

// Get response in json
app.get('/api/v1/on-covid-19/json', (req, res) => {
  const data = req.body;
  const estimate = covid19ImpactEstimator(data);
  res.json({ estimate });
});

// Get response  in xml
app.get('/api/v1/on-covid-19/xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  const data = req.body;
  const estimate = covid19ImpactEstimator(data);
  res.send((js2xmlparser.parse('estimate', estimate)));
});

// Get logs
app.get('/api/v1/on-covid-19/logs', (req, res) => {
  const filename = path.resolve(`${__dirname}/access.log`);
  const readStream = fs.createReadStream(filename);
  readStream.on('open', () => {
    readStream.pipe(res);
  });

  readStream.on('error', (err) => {
    res.end(err);
  });
});


app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
