const { SlashCommandBuilder, hyperlink, EmbedBuilder, IntegrationApplication } = require("discord.js");
const lewyim = require("../../../../../../config.json");
const children = require('child_process');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restart")
    .setDescription("Moderasyon Botunu yeniden başlatmaya yarar."),

  async execute(interaction, client) {
   if(!lewyim.owners.includes(interaction.user.id)) {
        return interaction.reply({ content: ":x: Bot developerı olmadığın için kullanamazsın.", ephemeral: true })
    }
await interaction.reply({ content: `__**Bot**__ yeniden başlatılıyor!`, ephemeral: true });
children.exec(`pm2 restart ${lewyim.GuildName}_Voucher ${lewyim.GuildName}_Statistics ${lewyim.GuildName}_Guard_I ${lewyim.GuildName}_Guard_II ${lewyim.GuildName}_Guard_III ${lewyim.GuildName}_Moderation`);
}
};