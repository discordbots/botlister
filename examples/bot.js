// example using the Eris library
const Eris = require('eris');
const Botlister = require('botlister');

const bot = new Eris(process.env.BOT_TOKEN);
const lister = new Botlister({ apiToken: process.env.DBL_TOKEN, defaultBotId: process.env.BOT_ID })
bot.on('ready', () => {
    lister.updateBotStatistics({
        guilds: bot.guilds.size,
        users: bot.users.size
    }).then(() => console.log('Updated statistics on discordbotlist.com')).catch(console.error);
});

bot.connect();