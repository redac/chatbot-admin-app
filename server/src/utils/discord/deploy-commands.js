const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../../config.json');
const { data } = require('../../utils/data');

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),
  new SlashCommandBuilder()
    .setName('info')
    .setDescription("Replies with a chatbot's info!")
    .addIntegerOption((option) => {
      option
        .setName('id')
        .setDescription('The id of the chatbot')
        .setRequired(true);
      return option;
    }),
  new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Sends a message to a chatbot')
    .addIntegerOption((option) => {
      option
        .setName('id')
        .setDescription('The id of chatbot you want to communicate with')
        .setRequired(true);
      Object.values(data.chatbots).map((bot) => {
        const botName = bot.info.name;
        const botID = bot.info.bot_id;
        option.setChoices(botName, botID);
      });
      return option;
    })
    .addStringOption((option) => {
      option
        .setName('message')
        .setDescription('The message you want to send')
        .setRequired(true);
      Object.values(data.chatbots).map((bot) => {
        const botName = bot.info.name;
        const botID = bot.info.bot_id;
        option.setChoices(botName, botID);
      });
      return option;
    }),
].map((command) => command.toJSON());

function deployDiscordCommands() {
  const rest = new REST({ version: '9' }).setToken(token);
  console.log(`Choices: ${commands[2].options.choices}`);
  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() =>
      console.log('DISCORD: Successfully registered application commands.')
    )
    .catch(console.error);
}

module.exports = { deployDiscordCommands };
