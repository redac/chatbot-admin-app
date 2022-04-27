const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const appAdmin = express();
// parse application/x-www-form-urlencoded
appAdmin.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
appAdmin.use(bodyParser.json());

//Cross origin
appAdmin.use(cors());

const services = ['brains', 'chatbots', 'interfaces'];

services.forEach((service) => {
  appAdmin.use('/api/' + service, require('./src/routes/' + service));
});

appAdmin.use(express.static('src/public'));

module.exports = appAdmin;
