const express = require('express');
const router = express.Router();
const fs = require('fs');
const { data } = require('../utils/data');

// Store rive files name in the brains array
fs.readdir('src/public/brains', (_err, files) => {
  files.forEach((file) => {
    data.brains.push(file.split('.')[0]);
  });
});

/**
 * GET
 * /api/brains
 * List currently loaded brain files
 */
router.get('/', (_req, res) => {
  res.send(data.brains);
});

module.exports = router;
