module.exports.BASE_URL = `https://discordbotlist.com/api`;

module.exports.BOT_STATISTICS = (botId) => `${module.exports.BASE_URL}/bots/${botId}/stats`;
module.exports.BOT_GENERATE_TOKEN = (botId) => `${module.exports.BASE_URL}/bots/${botId}/token`;
module.exports.BOT_UPVOTES = (botId) => `${module.exports.BASE_URL}/bots/${botId}/upvotes`;
module.exports.FETCH_BOT = (botId) => `${module.exports.BASE_URL}/bots/${botId}`;
module.exports.FETCH_USER = (userId) => `${module.exports.BASE_URL}/users/${userId}`;
module.exports.FETCH_ALL_BOTS = () => `${module.exports.BASE_URL}/bots`;
module.exports.FETCH_MY_BOTS = () => `${module.exports.BASE_URL}/bots/mine`;