const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const RiveScript = require('rivescript');
const Mastodon = require('mastodon-api');

const BASE_BOT_PORT = 4001;

const router = express.Router();

let chatbots = (global.chatbots = {});
let brains = (global.brains = []);
let interfaces = (global.interfaces = ['Web', 'Mastodon', 'Discord']);
chatbots.next_id = 0;

// Stores rive files name
fs.readdir('src/public/brains', (_err, files) => {
  files.forEach((file) => {
    brains.push(file.split('.')[0]);
  });
});

function loading_error(err, _filename, _lineno) {
  console.log('Error when loading files: ' + err);
}

function createChatbot(botName) {
  let id = chatbots.next_id++;
  let bot = {
    info: {
      id: id,
      name: botName,
      brain: null,
      url: 'http://localhost:' + (BASE_BOT_PORT + id),
      web: 'off',
      mastodon: 'off',
      discord: 'off',
    },
    rive: null,
    web: null,
    mastodon: null,
    mastodon_handler: null,
    discord: null,
  };
  chatbots[id] = bot;
  return id;
}

function addBrain(id, brain) {
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
      chatbots[id].info.brain = brain;
      chatbots[id].rive = rive;
      console.log('Rive ' + brain + ' for Chatbot(' + id + ') loaded');
    })
    .catch(loading_error);
}

function serviceMastodon(id, enable, access_token, url) {
  const chatbot = chatbots[id];
  if (enable != chatbot.info.mastodon) {
    if (!access_token || !url) return;
    chatbot.info.mastodon = enable;
    if (enable == 'on') {
      // New mastodon connection
      let M = new Mastodon({
        access_token: access_token,
        timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
        api_url: url + '/api/v1/',
      });
      // Start a stream from mastodon listening to notifications
      chatbot.mastodon = M.stream('streaming/user');
      chatbot.mastodon_handler = function (notification) {
        if (notification.data.type == 'mention') {
          let content = notification.data.status.content;
          let user = notification.data.account.username;
          let reply_id = notification.data.status.id;
          // Get message from html content
          // Not really pretty but it works
          // mastodon status syntax : @BotName message
          let message = content.split('</span></a></span>')[1].split('</p>')[0];
          // Get reply from rive and answer by posting reply to mastodon
          chatbot.rive.reply(user, message).then(function (reply) {
            M.post(
              'statuses',
              { status: reply, in_reply_to_id: reply_id },
              (err, _data) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          });
        }
      };
      chatbot.mastodon.on('message', chatbot.mastodon_handler);
      console.log('Chatbot(' + id + ') mastodon service opened');
    } else {
      chatbot.mastodon.removeListener('message', chatbot.mastodon_handler);
      chatbot.mastodon = null;
      chatbot.mastodon_handler = null;
      console.log('Chatbot(' + id + ') mastodon service closed');
    }
  }
}

function botService(id) {
  const appBot = express();
  appBot.use(bodyParser.json()); // support json encoded bodies
  appBot.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  appBot.use(cors()); // support encoded bodies

  appBot.post('/', (req, res) => {
    let { login, message } = req.body;
    // req.params["message"]=req.params["message"].replace(/_/g, " ");
    console.log('POST ' + JSON.stringify(req.body));

    chatbots[id].rive.reply(login, message).then(function (reply) {
      res.send({ name: chatbots[id].info.name, message: reply });
    });
  });

  let port = BASE_BOT_PORT + parseInt(id);
  // Save server to close it later if needed
  chatbots[id].web = appBot.listen(port, () => {
    console.log(
      chatbots[id].info.name +
        ' chatbot(id = ' +
        id +
        ') is listening on port ' +
        port
    );
  });
  chatbots[id].info.web = 'on';
}

/**
 * GET
 * /api/chatbots
 * Get all bots
 *  */
router.get('/', (_req, res) => {
  res.json(Object.values(chatbots).map((x) => x.info));
});

/**
 * POST /api/chatbots
 * Create a bot
 */
router.post('/', (req, res) => {
  let name = req.body.name !== '' ? req.body.name : 'Steve';
  var id = createChatbot(name);
  addBrain(id, 'rs-standard');
  botService(id);
  notify(res, 'bot created (id:' + id + ')');
});

/**
 * Modifies a chatbot
 */
router.patch('/:id', (req, res) => {
  let modified = [];
  let id = parseInt(req.params.id);
  if (chatbots[id] === undefined) res.send("chatbot '" + id + "' not found");
  console.log(id, chatbots[id].info);
  // Modify name
  if (req.body.name) {
    chatbots[id].info.name = req.body.name;
    modified.push('Name :' + req.body.name);
  }
  // Modify brain
  if (
    req.body.brain !== undefined &&
    chatbots[id].info.brain !== req.body.brain
  ) {
    addBrain(id, req.body.brain);
    modified.push('Brain :' + req.body.brain);
  }
  // Modify web interface
  if (req.body.web && req.body.web !== chatbots[id].info.web) {
    if (req.body.web == 'off') {
      chatbots[id].info.web = 'off';
      chatbots[id].web.close();
      console.log('Chatbot(' + id + ') web service closed');
    } else {
      botService(id);
    }
    modified.push('Web service: ' + req.body.web);
  }
  // Modify mastodon interface
  if (req.body.mastodon && req.body.mastodon !== chatbots[id].info.mastodon) {
    serviceMastodon(
      id,
      req.body.mastodon,
      req.body.access_token,
      req.body.mastodon_url
    );
    modified.push('Mastodon service: ' + req.body.mastodon);
  }

  notify(res, "bot '" + id + "' modified (" + modified.join(',') + ')');
});

/**
 * Deletes a chatbot
 */
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (chatbots[id] === undefined) res.send("chatbot '" + id + "' not found");
  else {
    delete chatbots[id];
    console.log(chatbots[id]);
    notify(res, "bot '" + id + "' deleted ");
  }
});

// Utility functions

/**
 * Send a notification message
 * @param {*} res
 * @param {*} message
 */
function notify(res, message) {
  res.json({
    type: 'notification',
    message: message,
  });
}
/**
 * Send an error message
 * @param {*} res
 * @param {*} message
 */
function error(res, message) {
  res.json({
    type: 'error',
    message: message,
  });
}

module.exports = router;
