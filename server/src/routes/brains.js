const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
let brains = (global.brains = []);

// Stores rive files name in the brains array
fs.readdir('src/public/brains', (_err, files) => {
  files.forEach((file) => {
    brains.push(file.split('.')[0]);
  });
});

// route for user logout
router.get('/', (_req, res) => {
  res.send(global.brains);
});

module.exports = router;
