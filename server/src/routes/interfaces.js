const express = require('express');
const router = express.Router();
const { data } = require('../utils/data');

// route for user logout
router.get('/', (_req, res) => {
  res.send(data.interfaces);
});

module.exports = router;
