const express = require('express');

const { data } = require('../utils/data');
const { prisma } = require('../utils/db');
const {
  _mapDbBotToLocalBot,
  addBrain,
  addChatbot,
  botService,
} = require('../utils/util');

const INIT_PORT = 4001;
const router = express.Router();

// chatbots API Endpoints

/**
 * GET
 * /api/chatbots
 * Get all bots
 *  */
router.get('/', async (_req, res, next) => {
  try {
    const bots = Object.values(data.chatbots).map((x) => x.info);
    res.json(bots);
  } catch (error) {
    next(error);
  }
  //
});

/**
 * GET
 * /api/chatbots.:id
 * Get one bot given its id
 *  */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const bot = await prisma.bot.findUnique({
      where: {
        bot_id: Number(id),
      },
    });
    if (bot) {
      res.json(bot);
    } else {
      res.json('Chatbot not found ! 🤖');
    }
  } catch (error) {
    next(error);
  }
  //
});

/**
 * POST
 * /api/chatbots
 * Create a bot
 */
router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const [id, createdBot] = await addChatbot(name, next);
    addBrain(id, 'rs-standard');
    botService(id);
    res.json(createdBot);
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH
 * /api/chatbots/:id
 * Modify a bot
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const botBody = req.body;
    const updatedBot = await prisma.bot.update({
      where: {
        bot_id: Number(id),
      },
      data: {
        ...botBody,
      },
    });

    data.chatbots[id] = _mapDbBotToLocalBot(updatedBot);
    res.json(updatedBot);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE
 * /api/chatbots/:id
 * Deletes a chatbot
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBot = await prisma.bot.delete({
      where: { bot_id: Number(id) },
    });
    delete data.chatbots[deletedBot.bot_id];
    res.json(deletedBot);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
