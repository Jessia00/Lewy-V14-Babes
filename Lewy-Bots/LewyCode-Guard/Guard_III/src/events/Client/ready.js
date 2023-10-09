const { EmbedBuilder, ActivityType } = require("discord.js")
const lewyim = require("../../../../../../config.json");
const setup = require("../../../../../LewyCode-Main/src/configs/sunucuayar.json");
const request = require('request');
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
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

        setInterval(async () => {
        if(guild.vanityURLCode == setup.serverUrl) {
        return } else {
          request({method: "PATCH", url: `https://discord.com/api/v9/guilds/${lewyim.GuildID}/vanity-url`,
          headers: { 
              "Authorization": `${lewyim.Guard.Token.UrlGuardToken}`,
              "User-Agent": `lewy Url Guard`,
              "Content-Type": `application/json`,
              "X-Audit-Log-Reason": `Hello i am under the watter`
          },
          body: { "code": setup.serverUrl },
          json: true
          });
        }}, 1000)
};

module.exports.conf = {
  name: "ready",
};
