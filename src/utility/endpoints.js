module.exports.BASE_URL = `https://discordbotlist.com/api`;

module.exports.BOT_STATISTICS = (botId) => `${module.exports.BASE_URL}/bots/${botId}/stats`;
module.exports.BOT_GENERATE_TOKEN = (botId) => `${module.exports.BASE_URL}/bots/${botId}/token`;
module.exports.BOT_UPVOTES = (botId) => `${module.exports.BASE_URL}/bots/${botId}/upvotes`;
module.exports.FETCH_BOT = (botId) => `${module.exports.BASE_URL}/bots/${botId}`;
module.exports.FETCH_USER = (userId) => `${module.exports.BASE_URL}/users/${userId}`;
module.exports.FETCH_ALL_BOTS = () => `${module.exports.BASE_URL}/bots`;
module.exports.ADMIN_REFRESH_USER = (userId) => `${module.exports.BASE_URL}/users/${userId}/refresh`;
module.exports.ADMIN_BAN_USER = (userId) => `${module.exports.BASE_URL}/users/${userId}/ban`;
module.exports.ADMIN_REFRESH_BOT = (botId) => `${module.exports.BASE_URL}/bots/${botId}/refresh`;
module.exports.ADMIN_VERIFY_BOT = (botId) => `${module.exports.BASE_URL}/bots/${botId}/verification`;
module.exports.ADMIN_FETCH_UNINVITED_BOTS = (botId) => `${module.exports.BASE_URL}/bots/uninvited`;
module.exports.ADMIN_FETCH_DBL_CONFIG = (botId) => `${module.exports.BASE_URL}/dbl/configurations`;
