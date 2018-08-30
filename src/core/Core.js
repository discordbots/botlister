const Https = require('../modules/Https');
const Endpoints = require('../utility/Endpoints');
const Bot = require('../structures/Bot');
const User = require('../structures/User');

class Core {
    constructor({ apiToken = null, defaultBotId = null, userToken = null }) {
        this.apiToken = apiToken;
        this.defaultBotId = defaultBotId;
        this.userToken = userToken;
        this.https = new Https();
    }

    fetchPopularBots() {
        return this.https.getJSON({ url: Endpoints.BOTS() }).then((data) => data.map(bot => new Bot(bot, this)));
    }

    fetchAllBots(skip = 0) {
        return this.https.getJSON({ url: Endpoints.ALL_BOTS(skip) }).then((data) => data.map(bot => new Bot(bot, this)));
    }

    searchBots(searchTerm = '') {
        return this.https.getJSON({ url: Endpoints.SEARCH_BOTS(searchTerm) }).then((data) => data.map(bot => new Bot(bot, this)));
    }

    fetchMyBots() {
        if (!this.userToken) throw new Error('No User token was supplied');
        return this.https.getJSON({ url: Endpoints.CURRENT_USER_BOTS(), authorization: `Bearer ${this.userToken}` }).then((data) => data.map(bot => new Bot(bot, this)));
    }

    fetchBot(id = this.defaultBotId) {
        if (!id) throw new Error('No ID was supplied');
        return this.https.getJSON({ url: Endpoints.BOT(id) }).then(data => new Bot(data, this));
    }

    fetchUpvoters(id = this.defaultBotId) {
        if (!id) throw new Error('No ID was supplied');
        return this.https.getJSON({ url: Endpoints.BOT_UPVOTES(id) }).then((data) => data.map(user => new User(user, this)));
    }

    generateBotToken(id = this.defaultBotId) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.getJSON({ url: Endpoints.BOT_TOKEN(id) });
    }

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

    resetBotStatistics(id = this.defaultBotId) {
        if (!this.apiToken) throw new Error('No API token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.delete({ url: Endpoints.BOT_STATISTICS(id), authorization: `Bot ${this.apiToken}` });
    }

    deleteBot(id = this.defaultBotId) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.delete({ url: Endpoints.BOT(id), authorization: `Bearer ${this.userToken}` });
    }

    upvoteBot(id = this.defaultBotId) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.post({
            url: Endpoints.BOT_UPVOTES(id),
            authorization: `Bearer ${this.userToken}`
        });
    }

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

    fetchUser(id) {
        if (!id) throw new Error('No ID was supplied');
        return this.https.getJSON({ url: Endpoints.USER(id) }).then(data => new User(data, this));
    }

    banUser(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.post({
            url: Endpoints.ADMIN_BAN_USER(id),
            authorization: `Bearer ${this.userToken}`,
        });
        return response;
    }

    unbanUser(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.delete({
            url: Endpoints.ADMIN_BAN_USER(id),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    refreshUser(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.post({
            url: Endpoints.ADMIN_REFRESH_USER(id),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    fetchUninvitedBots() {
        if (!this.userToken) throw new Error('No User token was supplied');
        return this.https.getJSON({
            url: Endpoints.ADMIN_UNINVITED_BOTS(),
            authorization: `Bearer ${this.userToken}`,
        }).then(bots => bots.map(bot => new Bot(bot, this)))
    }

    verifyBot(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return his.https.post({
            url: Endpoints.ADMIN_BOT_VERIFICATION(id),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    unverifyBot(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.delete({
            url: Endpoints.ADMIN_BOT_VERIFICATION(id),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    refreshBot(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        return this.https.post({
            url: Endpoints.ADMIN_REFRESH_BOT(id),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    fetchConfiguration() {
        if (!this.userToken) throw new Error('No User token was supplied');
        return this.https.getJSON({
            url: Endpoints.ADMIN_CONFIGURATION(),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    lockDatabase() {
        if (!this.userToken) throw new Error('No User token was supplied');
        return this.https.post({
            url: Endpoints.ADMIN_DATABASE_LOCK(),
            authorization: `Bearer ${this.userToken}`,
        });
    }

    unlockDatabase() {
        if (!this.userToken) throw new Error('No User token was supplied');
        return this.https.delete({
            url: Endpoints.ADMIN_DATABASE_LOCK(),
            authorization: `Bearer ${this.userToken}`,
        });
    }
}

module.exports = Core;