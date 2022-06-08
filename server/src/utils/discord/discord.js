const { Client, Intents, MessageEmbed } = require('discord.js');
const { token } = require('../../config.json');
const { data } = require('../../utils/data');
const { deployDiscordCommands } = require('./deploy-commands');

const axios = require('axios');

async function discordService() {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

  deployDiscordCommands();

  client.once('ready', () => {
    console.log(`DISCORD: Runt is ready!`);
  });

  const bots = await data.chatbots;

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    if (commandName === 'ping') {
      await interaction.reply('Pong!');
    } else if (commandName === 'info') {
      try {
        await interaction.deferReply();
        const botID = interaction.options.getInteger('id');
        const response = await axios.get(
          `http://localhost:3030/api/chatbots/${botID}`
        );

        const resBot = response.data;

        if (resBot) {
          const successEmbed = new MessageEmbed()
            .setColor('#e0e8f5')
            .setTitle('Chatbot Found !')
            .setURL(`http://localhost:3030/api/chatbots/${botID}`)
            .addFields(
              {
                name: 'Chatbot ID',
                value: resBot.bot_id.toString(),
                inline: true,
              },
              { name: 'Chatbot Name', value: resBot.name, inline: true },
              {
                name: 'Rivescript Brain File',
                value: `${resBot.brain}.rive`,
                inline: true,
              },
              {
                name: 'Web interface',
                value: resBot.web.toString(),
                inline: true,
              },
              {
                name: 'Discord interface',
                value: resBot.discord.toString(),
                inline: true,
              }
            )
            .setImage('https://i.imgur.com/yTCE2T0.jpg');

          await interaction.editReply({ embeds: [successEmbed] });
        } else {
          const failEmbed = new MessageEmbed()
            .setColor('#ff7369')
            .setTitle('Chatbot Not Found !')
            .setURL(`http://localhost:3030/api/chatbots/${botID}`)
            .setTimestamp();
          await interaction.editReply({ embeds: [failEmbed] });
        }
      } catch (error) {
        console.log(error);
      }
    } else if (commandName === 'chat') {
      // TODO: Change to POST request to the display a dropdown with all bots and then select a bot to talk to
      try {
        await interaction.deferReply();
        const botID = interaction.options.getInteger('id');
        const msgContent = interaction.options.getString('message');
        if (bots[botID]) {
          if (bots[botID].info.discord) {
            // Fetch response
            const res = await axios.post(`${bots[botID].info.url}`, {
              login: 'user',
              message: msgContent,
            });
            const botReply = res.data;
            const replyEmbed = new MessageEmbed()
              .setColor('#e0e8f5')
              .setDescription(botReply.message)
              .setFooter({ text: `Last Sent Message: "${msgContent}"` })
              .setAuthor({
                name: data.chatbots[botID].info.name,
                url: 'http://localhost:3000',
              })
              .setTimestamp();
            await interaction.editReply({ embeds: [replyEmbed] });
          } else {
            // Send message error
            const failEmbed = new MessageEmbed()
              .setColor('#ff7369')
              .setTitle('Discord Interface is OFF !')
              .setDescription(
                'Please turn on the discord interface using the UI'
              )
              .setURL(`http://localhost:3000`)
              .setImage(
                'https://cdn.discordapp.com/attachments/982975297576116317/983074778455867402/unknown.png'
              )
              .setTimestamp();
            await interaction.editReply({ embeds: [failEmbed] });
          }
        } else {
          const botNotFoundEmbed = new MessageEmbed()
            .setColor('#ff7369')
            .setTitle('Chatbot Not Found !')
            .setURL(`http://localhost:3030/api/chatbots/${botID}`)
            .setTimestamp();
          await interaction.editReply({ embeds: [botNotFoundEmbed] });
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  client.login(token);
}

module.exports = { discordService };
