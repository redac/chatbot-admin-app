// Utility functions
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const RiveScript = require('rivescript');

const { data, INIT_PORT } = require('../utils/data');

const prisma = require('./prisma')

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
 * Add a chatbot to the DB and create its object
 * @param {String} name
 * @returns
 */
async function addChatbot(name) {
  const bot = {
    info: {
      name: name,
    },
    rive: null,
    webObj: null,
    discordObj: null,
  };
  //Add Bot to DB
  try {
    const createdBot = await prisma.bot.create({
      data: {
        name: bot.info.name,
      },
    });
    
    data.chatbots[createdBot.bot_id] = _mapDbBotToLocalBot(createdBot);
    return [createdBot.bot_id, createdBot];
  } catch (error) {
    console.log(error)
    throw error
  }

}

function _mapDbBotToLocalBot(dbBot) {
  return {
    info: {
      ...dbBot,
      url: 'http://localhost:' + (INIT_PORT + dbBot.bot_id),
    },
    rive: null,
    webObj: null,
    discordObj: null,
  };
}

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
      console.log('Brain file "' + brain + '.rive" loaded for chatbot ' + id);
    })
    .catch(loading_error);
  return rive;
}

/**
 * Launches a bot's web service
 * @param {int} id
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
   * GET: display api help
   */
  appBot.get('/', (req, res) => {
    const exampleJSON = {
      login: 'Reda',
      message: 'My name is Reda',
    };
    res.send(
      `<p>usage : send a POST request containing the login (a username) as well as the message you want to send to the chatbot </br> 
    example: </p>` + JSON.stringify(exampleJSON)
    );
  });

  /**
   * POST: Send message to chatbot
   */
  appBot.post('/', (req, res) => {
    let { login, message } = req.body;
    bots[id].rive.reply(login, message).then(function (reply) {
      res.send({ name: bots[id].info.name, message: reply });
    });
  });

  // Save server to close it later if needed
  bots[id].webObj = appBot.listen(port, () => {
    console.log('Chatbot ' + id + ' is listening on port ' + port + ' 🤖 ');
  });
  bots[id].info.web = true;
}


module.exports = {
  loading_error,
  notify,
  notify_error,
  _mapDbBotToLocalBot,
  addChatbot,
  addBrain,
  botService
};
