const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const RiveScript = require('rivescript');

const { data, INIT_PORT } = require('../utils/data');

const prisma = require('./prisma');

/**
 * Log an error when file loading fails
 * @param {*} err
 * @param {*} _filename
 * @param {*} _lineno
 */
function loading_error(err, filename, _lineno) {
  console.log('Error when loading files' + filename + ' , ' + err);
}

/**
 * Send a notification message
 * @param {*} res
 * @param {*} message
 */
function notify(res, message) {
  res.send(
    JSON.stringify({
      type: 'notification',
      message: message,
    })
  );
}

/**
 * Send an error message
 * @param {*} res
 * @param {*} message
 */
function notify_error(res, message) {
  res.send(
    JSON.stringify({
      type: 'error',
      message: message,
    })
  );
}

// Bot related utility functions

/**
 * Add a chatbot to the DB and create its local object
 * @param {String} name The bot's name
 * @returns {*} id, createdBot
 */
async function addChatbot(name) {
  const bot = {
    info: {
      name: name || undefined,
    },
    rive: null,
    webObj: null,
    discordObj: null,
  };
  // Add Bot info to DB
  try {
    const createdBot = await prisma.bot.create({
      data: {
        name: bot.info.name,
      },
    });

    data.chatbots[createdBot.bot_id] = _mapDbBotToLocalBot(createdBot);
    return [createdBot.bot_id, createdBot];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Create a local bot object from db info
 * @param {*} dbBot The database bot object; contains info only
 * @returns
 */
function _mapDbBotToLocalBot(dbBot) {
  return {
    info: {
      ...dbBot,
      url: 'http://localhost:' + (INIT_PORT + dbBot.bot_id),
    },
    rive: addBrain(dbBot.bot_id, dbBot.brain),
    webObj: null,
    discordObj: null,
  };
}

/**
 * Tie a brain file to a rivescript object
 * @param {*} id The bot's id
 * @param {*} brain The name of the brain file; has to be in src/public/brains
 * @returns
 */
async function addBrain(id, brain) {
  let rive = new RiveScript({
    utf8: true,
  });
  rive.display = {
    id: id,
    status: 'off',
  };
  rive
    .loadFile('src/public/brains/' + brain + '.rive')
    .then(() => {
      rive.sortReplies();
      data.chatbots[id].info.brain = brain;
      data.chatbots[id].rive = rive;
      console.log(
        `Brain loaded: '${brain}.rive' for chatbot (${id} - ${data.chatbots[id].info.name})`
      );
    })
    .catch(loading_error);
  return rive;
}

/**
 * Launch a bot's web service
 * @param {int} id The bot's id
 */
async function botService(id) {
  const appBot = express();
  // support json encoded bodies
  appBot.use(bodyParser.json());
  // support url encoded bodies
  appBot.use(bodyParser.urlencoded({ extended: true }));
  appBot.use(cors());

  /**
   * Web interface communication
   */
  const port = INIT_PORT + parseInt(id);
  const bots = await data.chatbots;

  /**
   * GET: display bot's api help
   */
  appBot.get('/', (_req, res) => {
    const exampleJSON = {
      _comment: 'Usage: Send a POST request with the following in its body',
      login: 'Reda',
      message: 'My name is Reda',
    };
    res.status(200).json(exampleJSON);
  });

  /**
   * POST: Send message to chatbot
   */
  appBot.post('/', (req, res) => {
    const { login, message } = req.body;
    bots[id].rive
      .reply(login, message)
      .then(function (reply) {
        res.send({ name: bots[id].info.name, message: reply });
      })
      .catch((err) => console.log(err));
  });

  // Save server to close it later if needed
  bots[id].webObj = appBot.listen(port, () => {
    console.log(
      `Chatbot (${id} - ${data.chatbots[id].info.name}) is listening on port ${port} 🤖`
    );
  });
  if (!bots[id].info.web) {
    bots[id].webObj.close();
  }
}

module.exports = {
  loading_error,
  notify,
  notify_error,
  _mapDbBotToLocalBot,
  addChatbot,
  addBrain,
  botService,
};
