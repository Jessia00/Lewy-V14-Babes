const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const lewyim = require("../../../../../../config.json");
const conf = require("../../../../../LewyCode-Main/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
let roleCreateLimit = {};

module.exports = async (role) => {
let entry = await role.guild.fetchAuditLogs({ type: AuditLogEvent.RoleCreate }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "role") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
if (!roleCreateLimit[entry.executor.id]) roleCreateLimit[entry.executor.id] = 0;
if (roleCreateLimit[entry.executor.id] && roleCreateLimit[entry.executor.id] >= lewyim.Guard.Limit.RoleCreate) {
    roleCreateLimit[entry.executor.id] = 0;

    let member = role.guild.members.cache.get(entry.executor.id); 

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
      .setCustomId("cezaac")
      .setDisabled(conf.jailRole.some(x => member.roles.cache.has(x)) ? true : false)
      .setLabel("Ceza Kaldır").setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
      .setCustomId("yetkileriac")
      .setLabel("Yetki Aç").setStyle(ButtonStyle.Danger)
    )
    

const lewy = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} üyesi **${lewyim.Guard.Limit.RoleCreate}** limitinden fazla rol açmayı denediği için jaile attım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

let lewyGuardLog = await role.guild.channels.cache.find(x => x.name == "guard_log").send({ embeds: [lewy], components: [row] });

var filter = (button) => conf.sahipRolu.some(x => x == button.member.roles.cache.has(x)) || lewyim.owners.includes(button.user.id);
const collector = await lewyGuardLog.createMessageComponentCollector({ filter });

collector.on('collect', async (button) => {
  if (button.customId == "cezaac") {
      member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.unregRoles[0]]) : member.roles.set(conf.unregRoles)
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde ${entry.executor} (\`${entry.executor.id}\`) kişisinin jailini kaldırdın!`, ephemeral: true })
  }
  if (button.customId == "yetkileriac") {
      client.allPermissionOpen();
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde sunucudaki rollerin yetkilerini açtın!`, ephemeral: true })
  }
})
return;
};
    roleCreateLimit[entry.executor.id] += 1;
    setTimeout(() => {
        roleCreateLimit[entry.executor.id] = 0;
    }, 1000 * 60 * 3);

const lewy = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} üyesinin geriye kalan rol açma limiti: **${roleCreateLimit[entry.executor.id]}/${lewyim.Guard.Limit.RoleCreate}**.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return role.guild.channels.cache.find(x => x.name == "guard_log").send({ embeds: [lewy] });
};

module.exports.conf = {
  name: "roleCreate",
};