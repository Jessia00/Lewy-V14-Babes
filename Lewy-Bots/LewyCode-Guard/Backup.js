const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const lewyim = require("../../config.json");
let Bots = global.bots = []
module.exports = Bots

let tkn = []

tkn.push(lewyim.Main.ModerationToken)
tkn.push(lewyim.Main.RegisterToken)
tkn.push(lewyim.Main.StatsToken)
lewyim.Guard.Token.Dağıtıcı.forEach(xx => 
tkn.push(xx)
)
if(lewyim.Destek.Active) {
tkn.push(lewyim.Destek.BotToken)
}
if(lewyim.Welcome.Active) {
lewyim.Welcome.Tokens.forEach(x => 
tkn.push(x)
)
}   

tkn.forEach(token => {
    let clients = new Client({
        fetchAllMembers: true,
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.MessageContent
        ],
        partials: [
            Partials.Channel,
            Partials.Message,
            Partials.User,
            Partials.GuildMember,
            Partials.Reaction
        ],
        presence: {
            status: "invisible"
        },
    });
    clients.on("ready", () => {
        Bots.push(clients);
    })

    clients.login(token).then(e => {
    }).catch(e => {
        console.log(`${token.substring(Math.floor(token.length / 2))} giriş yapamadı.`);
    });
});
