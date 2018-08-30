module.exports.BASE_URL = `https://discordbotlist.com/api`;

/* Regular Endpoints */
module.exports.BOTS = () => `${module.exports.BASE_URL}/bots`;
module.exports.ALL_BOTS = (skip = 0) => `${module.exports.BASE_URL}/bots?skip=${skip}&all=1`;
module.exports.SEARCH_BOTS = (term = '') => `${module.exports.BASE_URL}/bots?keywords=${term}`;
module.exports.CURRENT_USER_BOTS = () => `${module.exports.BASE_URL}/bots/mine`;
module.exports.BOT = (botId) => `${module.exports.BASE_URL}/bots/${botId}`;
module.exports.BOT_TOKEN = (botId) => `${module.exports.BASE_URL}/bots/${botId}/token`;
module.exports.BOT_UPVOTES = (botId) => `${module.exports.BASE_URL}/bots/${botId}/upvotes`;
module.exports.BOT_STATISTICS = (botId) => `${module.exports.BASE_URL}/bots/${botId}/stats`;
module.exports.USER = (userId) => `${module.exports.BASE_URL}/bots/${botId}`;

/* Admin Endpoints */
module.exports.ADMIN_BAN_USER = (userId) => `${module.exports.BASE_URL}/users/${userId}/ban`;
module.exports.ADMIN_REFRESH_USER = (userId) => `${module.exports.BASE_URL}/users/${userId}/refresh`;
module.exports.ADMIN_UNINVITED_BOTS = () => `${module.exports.BASE_URL}/bots/uninvited`;
module.exports.ADMIN_BOT_VERIFICATION = (botId) => `${module.exports.BASE_URL}/bots/${botId}/verification`;
module.exports.ADMIN_REFRESH_BOT = (botId) => `${module.exports.BASE_URL}/bots/${botId}/refresh`;
module.exports.ADMIN_CONFIGURATION = () => `${module.exports.BASE_URL}/dbl/configuration`;
module.exports.ADMIN_DATABASE_LOCK = () => `${module.exports.BASE_URL}/dbl/db-lock`;
