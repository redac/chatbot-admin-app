require('dotenv').config();

const app = require('./appAdmin');
const { initDB } = require('./src/utils/db');


async function startServer() {
  await initDB();
  app.listen(3030, async () => {
    console.log(`Main API server is running on port ${3030} 🚀`);
  });
}

startServer();
