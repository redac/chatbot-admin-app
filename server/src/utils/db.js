const prisma = require('./prisma')
const { data, INIT_PORT } = require('./data');
const { addBrain, botService } = require('./util');

const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890', 10)

/**
 * Create chatbot objects from information stored in the DB
 */
async function initDB() {
  const bots = await prisma.bot.findMany();
  bots.forEach((bot) => {
    data.chatbots[bot.bot_id] = {
      info: {
        ...bot,
        url: 'http://localhost:' + (INIT_PORT + bot.bot_id),
      },
      rive: addBrain(bot.bot_id, bot.brain),
      webObj: botService(bot.bot_id),
      discordObj: null,
    };
  });
}

function generateRandomTag() {
  return nanoid().substring(6, 10)
}

module.exports = { initDB };
