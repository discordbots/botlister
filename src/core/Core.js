const Https = require('../modules/Https');
const Endpoints = require('../utility/Endpoints');
const Bot = require('../structures/Bot');
const User = require('../structures/User');

 /**
    * Represents main library
    * @arg {Object} [options] Botlister options (all options are optional)
    * @arg {String} [options.apiToken=null] bot api token
    * @arg {String} [options.defaultBotId=null] Default bot ID to use when calling bot-related functions
    * @arg {String} [options.userToken=null] user account token
    */
class Core {
    constructor({ apiToken = null, defaultBotId = null, userToken = null }) {
        this.apiToken = apiToken;
        this.defaultBotId = defaultBotId;
        this.userToken = userToken;
        this.https = new Https();
    }

    /**
    * Fetch an array of "hot" or "popular" bots
    * @returns {Promise<Bot[]>} Resolves with an array of Bot objects
    */
    fetchPopularBots() {
        return this.https.getJSON({ url: Endpoints.BOTS() }).then((data) => data.map(bot => new Bot(bot, this)));
    }

    /**
    * Fetch an array of all bots on the website. Use lightly.
    * @arg {Number} [skip=0] Amount of bots to skip
    * @returns {Promise<Bot[]>} Resolves with an array of Bot objects
    */
    fetchAllBots(skip = 0) {
        return this.https.getJSON({ url: Endpoints.ALL_BOTS(skip) }).then((data) => data.map(bot => new Bot(bot, this)));
    }

    /**
    * Search through all bots with a search term.
    * @arg {String} [searchTerm] The search term to use
    * @returns {Promise<Bot[]>} Resolves with an array of Bot objects
    */
    searchBots(searchTerm = '') {
        return this.https.getJSON({ url: Endpoints.SEARCH_BOTS(searchTerm) }).then((data) => data.map(bot => new Bot(bot, this)));
    }

    /**
    * Fetch the current user's bots. Requires a userToken.
    * @arg {Number} [skip=0] Amount of bots to skip
    * @returns {Promise<Bot[]>} Resolves with an array of Bot objects
    */
    fetchMyBots() {
        if (!this.userToken) throw new Error('No User token was supplied');
        return this.https.getJSON({ url: Endpoints.CURRENT_USER_BOTS(), authorization: `Bearer ${this.userToken}` }).then((data) => data.map(bot => new Bot(bot, this)));
    }

    /**
    * Fetch a bot
    * @arg {String} [id] The ID of the bot to fetch, defaults to the defaultBotId (if one is set)
    * @returns {Promise<Bot>} Resolves with a Bot object
    */
    fetchBot(id = this.defaultBotId) {
        if (!id) throw new Error('No ID was supplied');
        return this.https.getJSON({ url: Endpoints.BOT(id) }).then(data => new Bot(data, this));
    }

    /**
    * Fetch an array of users who upvoted the bot
    * @arg {String} [id] The ID of the bot to fetch upvoters for, defaults to the defaultBotId (if one is set)
    * @returns {Promise<User[]>} Resolves with an array of User objects
    */
    fetchUpvoters(id = this.defaultBotId) {
        if (!id) throw new Error('No ID was supplied');
        return this.https.getJSON({ url: Endpoints.BOT_UPVOTES(id) }).then((data) => data.map(user => new User(user, this)));
    }

    /**
    * Re-generates the bot API token. Requires a userToken.
    * @arg {String} [id] The ID of the bot, defaults to the defaultBotId (if one is set)
    * @returns {Promise<String>} Resolves with a new apiToken
    */
    generateBotToken(id = this.defaultBotId) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.getJSON({ url: Endpoints.BOT_TOKEN(id), authorization: `Bearer ${this.userToken}` });
    }

    /**
    * Updates bot statistics. Requires an apiToken.
    * @arg {String} [id] The ID of the bot, defaults to the defaultBotId (if one is set)
    * @arg {Object} statistics Statistics to send
    * @arg {Number} [statistics.shardId] Shard ID to send data for
    * @arg {Number} [statistics.guilds] Amount of guilds
    * @arg {Number} [statistics.users] Amount of users
    * @arg {Number} [statistics.voiceConnections] Amount of voice connections
    * @returns {Promise}
    */
    updateBotStatistics(id = this.defaultBotId, statistics) {
        if (!this.apiToken) throw new Error('No API token was supplied');
        if (typeof id === 'object') {
            statistics = id;
            id = this.defaultBotId
        };
        if (!id) throw new Error('No ID was supplied');
        return this.https.post({
            url: Endpoints.BOT_STATISTICS(id),
            data: {
                shard_id: statistics.shardId,
                guilds: statistics.guilds,
                users: statistics.users,
                voice_connections: statistics.voiceConnections
            },
            authorization: `Bot ${this.apiToken}`
        });
    }

    /**
    * Resets bot statistics. Requires an apiToken.
    * @arg {String} [id] The ID of the bot, defaults to the defaultBotId (if one is set)
    * @returns {Promise}
    */
    resetBotStatistics(id = this.defaultBotId) {
        if (!this.apiToken) throw new Error('No API token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.delete({ url: Endpoints.BOT_STATISTICS(id), authorization: `Bot ${this.apiToken}` });
    }

    /**
    * Deletes the bot. Requires a userToken.
    * @arg {String} [id] The ID of the bot, defaults to the defaultBotId (if one is set)
    * @returns {Promise}
    */
    deleteBot(id = this.defaultBotId) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.delete({ url: Endpoints.BOT(id), authorization: `Bearer ${this.userToken}` });
    }

    /**
    * Upvotes the bot with the user's account. Requires a userToken.
    * @arg {String} [id] The ID of the bot, defaults to the defaultBotId (if one is set)
    * @returns {Promise}
    */
    upvoteBot(id = this.defaultBotId) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.post({
            url: Endpoints.BOT_UPVOTES(id),
            authorization: `Bearer ${this.userToken}`
        });
    }

    /**
    * Updates/edits the bot information on the website. Requires a userToken.
    * @arg {String} [id] The ID of the bot, defaults to the defaultBotId (if one is set)
    * @arg {Object} info Updated bot information
    * @arg {String} [info.shortDescription] Short description
    * @arg {String} [info.longDescription] Long description
    * @arg {String} [info.prefix] Bot prefix
    * @arg {String} [info.website] Bot website
    * @arg {String} [info.botInvite] Bot invite
    * @arg {String} [info.serverInvite] Server invite
    * @returns {Promise}
    */
    updateBotInformation(id = this.defaultBotId, info) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (typeof id === 'object') {
            info = id;
            id = this.defaultBotId
        };
        if (!id) throw new Error('No ID was supplied');
        return this.https.post({
            url: Endpoints.BOT(id),
            data: {
                short_description: info.shortDescription,
                long_description: info.longDescription,
                prefix: info.prefix,
                website: info.website,
                bot_invite: info.botInvite,
                server_invite: info.serverInvite
            },
            authorization: `Bearer ${this.userToken}`,
            options: { put: true }
        });
    }

    /**
    * Submits a new bot to the website. Requires a userToken.
    * @arg {Object} info Bot information
    * @arg {String} info.id The ID of the bot, defaults to the defaultBotId (if one is set)
    * @arg {String} info.shortDescription Short description
    * @arg {String} [info.longDescription] Long description
    * @arg {String} info.prefix Bot prefix
    * @arg {String} [info.website] Bot website
    * @arg {String} info.botInvite Bot invite
    * @arg {String} [info.serverInvite] Server invite
    * @returns {Promise}
    */
    addBot(info) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!info) throw new Error('No data was supplied');
        return this.https.post({
            url: Endpoints.BOTS(),
            data: {
                id: info.id,
                short_description: info.shortDescription,
                long_description: info.longDescription,
                prefix: info.prefix,
                website: info.website,
                bot_invite: info.botInvite,
                server_invite: info.serverInvite
            },
            authorization: `Bearer ${this.userToken}`,
        });
    }

    /**
    * Fetch a user
    * @arg {String} id The ID of the user
    * @returns {Promise<User>}
    */
    fetchUser(id) {
        if (!id) throw new Error('No ID was supplied');
        return this.https.getJSON({ url: Endpoints.USER(id) }).then(data => new User(data, this));
    }

    /**
    * Ban a user. Requires a userToken. Requires admin.
    * @arg {String} id The ID of the user
    * @returns {Promise}
    */
    banUser(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.post({
            url: Endpoints.ADMIN_BAN_USER(id),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    /**
    * Unban a user. Requires a userToken. Requires admin.
    * @arg {String} id The ID of the user
    * @returns {Promise}
    */
    unbanUser(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.delete({
            url: Endpoints.ADMIN_BAN_USER(id),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    /**
    * Refresh a user. Requires a userToken. Requires admin.
    * @arg {String} id The ID of the user
    * @returns {Promise}
    */
    refreshUser(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.post({
            url: Endpoints.ADMIN_REFRESH_USER(id),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    /**
    * Fetch an array of bots that are not in the DBL server. Requires a userToken. Requires admin.
    * @returns {Promise<Bot[]>} Resolves with an array of Bot objects
    */
    fetchUninvitedBots() {
        if (!this.userToken) throw new Error('No User token was supplied');
        return this.https.getJSON({
            url: Endpoints.ADMIN_UNINVITED_BOTS(),
            authorization: `Bearer ${this.userToken}`,
        }).then(bots => bots.map(bot => new Bot(bot, this)))
    }

    /**
    * Verify a bot. Requires a userToken. Requires admin.
    * @arg {String} id The ID of the bot
    * @returns {Promise}
    */
    verifyBot(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return his.https.post({
            url: Endpoints.ADMIN_BOT_VERIFICATION(id),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    /**
    * Unverify a bot. Requires a userToken. Requires admin.
    * @arg {String} id The ID of the user
    * @returns {Promise}
    */
    unverifyBot(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.delete({
            url: Endpoints.ADMIN_BOT_VERIFICATION(id),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    /**
    * Refresh a bot. Requires a userToken. Requires admin.
    * @arg {String} id The ID of the user
    * @returns {Promise}
    */
    refreshBot(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.post({
            url: Endpoints.ADMIN_REFRESH_BOT(id),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    /**
    * Fetch DBL configuration. Requires a userToken. Requires admin.
    * @returns {Promise<Object>} {"db_locked": true}
    */
    fetchConfiguration() {
        if (!this.userToken) throw new Error('No User token was supplied');
        return this.https.getJSON({
            url: Endpoints.ADMIN_CONFIGURATION(),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    /**
    * Lock database. Requires a userToken. Requires admin.
    * @returns {Promise}
    */
    lockDatabase() {
        if (!this.userToken) throw new Error('No User token was supplied');
        return this.https.post({
            url: Endpoints.ADMIN_DATABASE_LOCK(),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    /**
    * Unlock database. Requires a userToken. Requires admin.
    * @returns {Promise}
    */
    unlockDatabase() {
        if (!this.userToken) throw new Error('No User token was supplied');
        return this.https.delete({
            url: Endpoints.ADMIN_DATABASE_LOCK(),
            authorization: `Bearer ${this.userToken}`,
        });
    }
}

module.exports = Core;