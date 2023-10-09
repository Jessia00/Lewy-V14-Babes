const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const lewyim = require("../../../../../../config.json");
const conf = require("../../../../../LewyCode-Main/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (guild) => {
let entry = await guild.fetchAuditLogs({ type: AuditLogEvent.IntegrationUpdate }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "bot")) return;
client.cezaVer(client, entry.executor.id, "jail");
client.allPermissionClose();
};

module.exports.conf = {
  name: "guildIntegrationsUpdate",
};