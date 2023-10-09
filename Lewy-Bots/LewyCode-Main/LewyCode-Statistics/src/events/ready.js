const client = global.bot;
const conf = require("../../../src/configs/sunucuayar.json");
const lewyim = require("../../../../../config.json");
const penals = require("../../../src/schemas/penals");
const bannedTag = require("../../../src/schemas/bannedTag");
const regstats = require("../../../src/schemas/registerStats");
const { EmbedBuilder, ActivityType } = require("discord.js")
module.exports = async () => {

let guild = client.guilds.cache.get(lewyim.GuildID);
await guild.members.fetch();

const { joinVoiceChannel, getVoiceConnection} = require("@discordjs/voice");

const connection = getVoiceConnection(lewyim.GuildID);
if (connection) return;
setInterval(async () => {
const VoiceChannel = client.channels.cache.get(lewyim.BotSesKanal);
if (VoiceChannel) { joinVoiceChannel({
  channelId: VoiceChannel.id,
  guildId: VoiceChannel.guild.id,
  adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
  selfDeaf: true
})}},
5000);

    let activities = lewyim.BotDurum, i = 0;
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`,
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/LewyCode"}), 10000);
 
};

module.exports.conf = {
  name: "ready",
};
