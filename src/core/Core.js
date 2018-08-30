const Https = require('../modules/Https');
const endpoints = require('../utility/endpoints');

class Core {
    constructor({ apiToken = null, defaultBotId = null, userToken = null }) {
        this.apiToken = apiToken;
        this.defaultBotId = defaultBotId;
        this.userToken = userToken;
        this.https = new Https();
    }

    async fetchPopularBots() {
        const response = await this.https.getJSON({ url: endpoints.BOTS() });
        return response;
    }

    async fetchAllBots(skip = 0) {
        const response = await this.https.getJSON({ url: endpoints.ALL_BOTS(skip) });
        return response;
    }

    async searchBots(searchTerm = '') {
        const response = await this.https.getJSON({ url: endpoints.SEARCH_BOTS(searchTerm) });
        return response;
    }

    async fetchMyBots() {
        if (!this.userToken) throw new Error('No User token was supplied');
        const response = await this.https.getJSON({ url: endpoints.SEARCH_BOTS(searchTerm), authorization: `Bearer ${this.userToken}` });
        return response;
    }

    async fetchBot(id = this.defaultBotId) {
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.getJSON({ url: endpoints.BOT(id) });
        return response;
    }

    async fetchBotStatistics(id = this.defaultBotId) {
        if (!id) throw new Error('No ID was supplied');
        const response = await this.fetchBot(id);
        return response.stats;
    }

    async fetchUpvotes(id = this.defaultBotId) {
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.getJSON({ url: endpoints.BOT_UPVOTES(id) });
        return response;
    }

    async generateBotToken(id = this.defaultBotId) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.getJSON({ url: endpoints.BOT_TOKEN(id) });
        return response;
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
        const response = await this.https.delete({ url: endpoints.BOT(id), authorization: `Bearer ${this.userToken}` });
        return response;
    }

    async upvoteBot(id = this.defaultBotId) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.post({
            url: endpoints.BOT_UPVOTES(id),
            authorization: `Bearer ${this.userToken}`
        });
        return response;
    }

    async updateBotInformation(id = this.defaultBotId, data) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (typeof id === 'object') {
            statistics = id;
            id = this.defaultBotId
        };
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.post({
            url: endpoints.BOT(id),
            data,
            authorization: `Bearer ${this.userToken}`,
            options: { put: true }
        });
        return response;
    }

    async addBot(data) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!data) throw new Error('No data was supplied');
        const response = await this.https.post({
            url: endpoints.BOTS(),
            data,
            authorization: `Bearer ${this.userToken}`,
        });
        return response;
    }

    async fetchUser(id) {
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.getJSON({ url: endpoints.USER(id) });
        return response;
    }

    async fetchUserBots(id) {
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.getJSON({ url: endpoints.USER(id) });
        return response.bots;
    }

    async banUser(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.post({
            url: endpoints.ADMIN_BAN_USER(id),
            authorization: `Bearer ${this.userToken}`,
        });
        return response;
    }

    async unbanUser(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.delete({
            url: endpoints.ADMIN_BAN_USER(id),
            authorization: `Bearer ${this.userToken}`,
        });
        return response;
    }

    async refreshUser(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.post({
            url: endpoints.ADMIN_REFRESH_USER(id),
            authorization: `Bearer ${this.userToken}`,
        });
        return response;
    }

    async fetchUninvitedBots() {
        if (!this.userToken) throw new Error('No User token was supplied');
        const response = await this.https.getJSON({
            url: endpoints.ADMIN_UNINVITED_BOTS(),
            authorization: `Bearer ${this.userToken}`,
        });
        return response;
    }

    async verifyBot(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.post({
            url: endpoints.ADMIN_BOT_VERIFICATION(id),
            authorization: `Bearer ${this.userToken}`,
        });
        return response;
    }

    async unverifyBot(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.delete({
            url: endpoints.ADMIN_BOT_VERIFICATION(id),
            authorization: `Bearer ${this.userToken}`,
        });
        return response;
    }

    async refreshBot(id) {
        if (!this.userToken) throw new Error('No User token was supplied');
        if (!id) throw new Error('No ID was supplied');
        const response = await this.https.post({
            url: endpoints.ADMIN_REFRESH_BOT(id),
            authorization: `Bearer ${this.userToken}`,
        });
        return response;
    }

    async getConfiguration() {
        if (!this.userToken) throw new Error('No User token was supplied');
        const response = await this.https.getJSON({
            url: endpoints.ADMIN_CONFIGURATION(),
            authorization: `Bearer ${this.userToken}`,
        });
        return response;
    }

    async lockDatabase() {
        if (!this.userToken) throw new Error('No User token was supplied');
        const response = await this.https.post({
            url: endpoints.ADMIN_DATABASE_LOCK(),
            authorization: `Bearer ${this.userToken}`,
        });
        return response;
    }

    async unlockDatabase() {
        if (!this.userToken) throw new Error('No User token was supplied');
        const response = await this.https.delete({
            url: endpoints.ADMIN_DATABASE_LOCK(),
            authorization: `Bearer ${this.userToken}`,
        });
        return response;
    }
}

module.exports = Core;