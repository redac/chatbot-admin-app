const express = require('express');
const router = express.Router();

// route for user logout
router.get('/', (_req, res) => {
  res.send(global.brains);
});

module.exports = router;
