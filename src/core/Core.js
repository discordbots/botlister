const Https = require('../modules/Https');
const endpoints = require('../utility/endpoints');

class Core {
    constructor({ apiToken, defaultBotId, userToken }) {
        this.apiToken = apiToken;
        this.defaultBotId = defaultBotId;
        this.userToken = userToken;
        this.https = new Https();
    }

    async fetchAllBots() {
        const response = await this.https.getJSON({ url: endpoints.FETCH_ALL_BOTS() });
        return response;
    }

    async fetchBot(id = this.defaultBotId) {
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.getJSON({ url: endpoints.FETCH_BOT(id) });
        return response;
    }

    async fetchBotStatistics(id = this.defaultBotId) {
        if (!id) throw new Error('No ID was supplied');
        const response = await this.fetchBot(id);
        return response.stats;
    }

    async updateBotStatistics(id = this.defaultBotId, statistics) {
        if (!this.apiToken) throw new Error('No API token was supplied');
        if (typeof id === 'object') {
            statistics = id;
            id = this.defaultBotId
        };
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.post({
            url: endpoints.BOT_STATISTICS(id),
            data: statistics,
            authorization: `Bot ${this.apiToken}`
        });
        return response;
    }

    async resetBotStatistics(id = this.defaultBotId) {
        if (!this.apiToken) throw new Error('No API token was supplied');
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.delete({ url: endpoints.BOT_STATISTICS(id), authorization: `Bot ${this.apiToken}` });
        return response;
    }

    async deleteBot(id = this.defaultBotId) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.delete({ url: endpoints.FETCH_BOT(id), authorization: `Bearer ${this.userToken}` });
        return response;
    }

    async upvoteBot(id = this.defaultBotId) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.post({
            url: endpoints.UPVOTE_BOT(id),
            authorization: `Bearer ${this.userToken}`
        });
        return response;
    }

    async fetchUser(id) {
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.getJSON({ url: endpoints.FETCH_USER(id) });
        return response;
    }

    async fetchUserBots(id) {
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.getJSON({ url: endpoints.FETCH_USER(id) });
        return response.bots;
    }
}

module.exports = Core;