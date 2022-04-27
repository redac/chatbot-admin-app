require('dotenv').config();

const app = require('./appAdmin');

const server = app.listen(3030, () => {
  console.log(`Main server is running on port ${server.address().port}`);
});
