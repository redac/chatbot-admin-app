const app = require('./appAdmin');
const { initDB } = require('./src/utils/db');
const { discordService } = require('./src/utils/discord/discord');

async function startServer() {
  await initDB();
  await discordService();
  app.listen(3030, async () => {
    console.log(`Main API server is running on port ${3030} 🚀`);
  });
}

startServer();
