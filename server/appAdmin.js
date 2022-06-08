const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const appAdmin = express();

// Parse application/x-www-form-urlencoded
appAdmin.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
appAdmin.use(bodyParser.json());

// Use Cross-Origin Resource Sharing
appAdmin.use(cors());

const services = ['brains', 'chatbots', 'interfaces'];

/**
 * Launch all API "services" : routers in the routes directory
 * Current services: brains, chatbots, interfaces
 */
services.forEach((service) => {
  appAdmin.use('/api/' + service, require('./src/routes/' + service));
});

// Serve static files
appAdmin.use(express.static('src/public'));

module.exports = appAdmin;
