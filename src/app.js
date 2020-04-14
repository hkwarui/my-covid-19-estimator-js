const express = require('express');

const path = require('path');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const js2xmlparser = require('js2xmlparser');

const fs = require('fs');


const covid19ImpactEstimator = require('./estimator.js');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'));
app.use(morgan(':method     :url      :status     :response-time ms', { stream: accessLogStream }));
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
  return next();
});

// post default response
app.post('/api/v1/on-covid-19', (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(404).json({
      message: 'No data inputed !'
    });
  }
  return res.json(covid19ImpactEstimator(data));
});

// Post response  in xml or json
app.post('/api/v1/on-covid-19/:format', (req, res) => {
  const { format } = req.params;
  if (format === 'xml') {
    res.header('Content-Type', 'application/xml');
    const data = req.body;
    if (!data) {
      return res.status(404).json({
        message: 'No data inputed !'
      });
    }
    const estimate = covid19ImpactEstimator(data);
    return res.send((js2xmlparser.parse('estimate', estimate)));
  } if (format === 'json') {
    const data = req.body;
    if (!data) {
      return res.status(404).json({
        message: 'No data inputed !'
      });
    }
    const estimate = covid19ImpactEstimator(data);
    return res.json({ estimate });
  }
  return res.status(400).json({ message: 'Bad request' });
});

// get logs
app.get('/api/v1/on-covid-19/logs', (req, res) => {
  const filename = path.resolve(`${__dirname}/access.log`);
  const readStream = fs.createReadStream(filename);
  res.header('Content-Type', 'text/plain');
  readStream.on('open', () => readStream.pipe(res));
  return readStream.on('error', (err) => res.end(err));
});
module.exports = app;
