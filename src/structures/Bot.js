const Constants = require('../utility/Constants');

class Bot {
    constructor(data, core) {
        this._core = core;
        this.id = data.id;
        this.createdAt = data.created_at;
        this.lastUpdatedAt = data.updated_at;

        this.update(data);
    }

    update(data) {
        this.avatar = data.avatar !== undefined ? data.avatar : this.avatar;
        this.username = data.username !== undefined ? data.username : this.username;
        this.discriminator = data.discriminator !== undefined ? data.discriminator : this.discriminator;
        this.shortDescription = (data.short_description !== (undefined || '')) ? data.short_description : this.shortDescription;
        this.longDescription = (data.long_description !== (undefined || '')) ? data.long_description : this.longDescription;
        this.prefix = (data.prefix !== (undefined || '')) ? data.prefix : this.prefix;
        this.website = (data.website !== (undefined || '')) ? data.website : this.website;
        this.botInvite = (data.bot_invite !== (undefined || '')) ? data.bot_invite : this.botInvite;
        this.serverInvite = (data.server_invite !== (undefined || '')) ? data.server_invite : this.serverInvite;
        this.verified = (data.verified !== undefined) ? data.verified : this.verified;
        this.upvotes = (data.upvotes !== undefined) ? data.upvotes : this.upvotes;
        this.upvoted = (data.is_upvoted !== undefined) ? data.is_upvoted : this.upvoted;
        this.owner = (data.owner !== undefined) ? data.owner : this.owner;
        this.statistics = (data.stats !== undefined) ? data.stats : this.statistics;
    }

    get defaultAvatarURL() {
        return Constants.DefaultAvatarHashes[this.discriminator % Constants.DefaultAvatarHashes.length];
    }

    get avatarURL() {
        return this.avatar ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.png` : this.defaultAvatarURL;
    }

    getUpvoters() {
        return this._core.fetchUpvoters(this.id);
    }

    regenerateToken() {
        return this._core.generateBotToken(this.id);
    }

    updateStatistics(data) {
        return this._core.updateBotStatistics(this.id, data)
    }

    resetStatistics() {
        return this._core.resetBotStatistics(this.id)
    }

    delete() {
        return this._core.deleteBot(this.id)
    }

    upvote() {
        return this._core.upvoteBot(this.id)
    }

    editInformation(data) {
        return this._core.updateBotInformation(this.id, data)
    }

    verify() {
        return this._core.verifyBot(this.id)
    }

    unverify() {
        return this._core.unverifyBot(this.id)
    }

    refresh() {
        return this._core.refreshBot(this.id)
    }
}

module.exports = Bot;