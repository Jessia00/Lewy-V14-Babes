const Discord = require("discord.js");
const lewyim = require("../../../../../../config.json");
const conf = require("../../../../src/configs/sunucuayar.json")

module.exports = {
  conf: {
    aliases: ["rolsuz","rolsüz"],
    name: "rolsuz",
    help: "rolsüz ver",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args, embed) => {
    let lewycim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
    if(args[0] == "ver") {
      lewycim.forEach(r => {
    r.roles.add(conf.unregRoles)
    })
    message.channel.send({ embeds: [embed.setDescription("Sunucuda rolü olmayan \`"+ lewycim.size +"\` kişiye kayıtsız rolü verildi!")] });
    } else if(!args[0]) {
    message.channel.send({ embeds: [embed.setDescription("Sunucumuzda rolü olmayan \`"+ lewycim.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsüz ver\` komutunu uygulayın!")] });   
}
  },
};
 