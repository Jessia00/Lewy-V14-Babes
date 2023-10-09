const { PermissionsBitField, ChannelType, SlashCommandBuilder, EmbedBuilder, IntegrationApplication, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { cizgi, green, red, star } = require('../../LewyCode-Main/src/configs/emojis.json');
const { Database } = require("ark.db");
const lewysetup = new Database("../data.json");
const conf = require('../../LewyCode-Main/src/configs/sunucuayar.json');
const lewyim = require('../../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kurulum")
    .setDescription("Destek bot kanal ve emoji kurulumunu sağlar."),

  async execute(interaction, client) {
   
     if(interaction.guild === null) {
        return interaction.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
      } else if(!lewyim.owners.includes(interaction.user.id)) {
        return interaction.reply({ content: ":x: Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
      } else {

       await interaction.reply({ content: `${green} Support Kanal kurulumu başarıyla tamamlanmıştır.`, ephemeral: true })

            await interaction.guild.channels.create({ name: 'Canlı Destek', 
                type: ChannelType.GuildCategory 
              }).then(async (channel) => {
                lewysetup.set("CanlıDestekKategoryID", `${channel.id}`)

                await interaction.guild.channels.create({ name: 'Canli Destek', 
                  type: ChannelType.GuildText,
                  parent: parent.id
              }).then(async (channel2) => {
                lewysetup.set("CanlıDestekLogChannelID", `${channel2.id}`)
              });
            });

            const parent = await interaction.guild.channels.create({ name: '📋 Yetkili basvuru', 
                type: ChannelType.GuildText 
              });

            await interaction.guild.channels.create({ name: '📋・yetkili-basvuru', 
                type: ChannelType.GuildText,
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    allow: [PermissionsBitField.Flags.ViewChannel,PermissionsBitField.Flags.SendMessages],
                }]
              });

            await interaction.guild.channels.create({ name: '📋・yetkili-basvuru-onay',  
                type: ChannelType.GuildText,
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                    deny: [PermissionsBitField.Flags.SendMessages],
                }]
              }).then(async (channel) => {
                lewysetup.set("BaşvuruDurumLog", `${channel.id}`)
              });

            await interaction.guild.channels.create({ name: '📋・yetkili-basvuru-log',  
                type: ChannelType.GuildText,
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
               {
                    id: conf.yetkilialımRol,
                    allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
               }]
              }).then(async (channel) => {
                lewysetup.set("BaşvuruLogChannelID", `${channel.id}`)
              });

            await interaction.guild.channels.create({ name: 'istek-sikayet-log', 
                type: ChannelType.GuildText,
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                }]
              }).then(async (channel) => {
                lewysetup.set("ÖneriİstekSikayetChannelID", `${channel.id}`)
              });
}
  },
};
