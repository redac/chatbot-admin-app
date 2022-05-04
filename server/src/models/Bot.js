var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/** @name BotSchema
 * @summary Define Bot Schema as a mongoose schema
 * @property id - int - id of the bot.
 * @property botName - String - Name of the bot.
 * @property brainName - String - Name of the rivescript brain.
 * @property interface - String - Web, Mastodon, Discord. - Web by default
 */
var BotSchema = new Schema({
  id: { type: Number, required: true, max: 100 },
  botName: { type: String, required: true, max: 100 },
  brainName: { type: String, required: true, max: 100 },
  interface: { type: String, required: true, default: 'Web' },
});

// Export the schema to mongoose
module.exports = mongoose.model('Bot', BotSchema);
