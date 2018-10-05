const Constants = require('../utility/Constants');
const User = require('./User');

/**
* Represents a DBL bot
* @prop {String} id The ID of the bot
* @prop {Timestamp} createdAt Timestamp of when the bot was added to DBL
* @prop {Timestamp} lastUpdatedAt Timestamp of when the bot was last updated
* @prop {String?} avatar The hash of the bot's avatar, or null if no avatar
* @prop {String} defaultAvatarURL The URL of the bot's default avatar
* @prop {String} avatarURL The URL of the bot's avatar
* @prop {String} username The username of the bot
* @prop {String} discriminator The discriminator of the bot
* @prop {String} shortDescription The short description of the bot
* @prop {String} longDescription The long description of the bot
* @prop {String} prefix The bot prefix
* @prop {String} website The bot website
* @prop {String} botInvite The invite to the bot
* @prop {String} serverInvite Server invite
* @prop {Boolean} verified Whether the bot is verified or not
* @prop {Number} upvotes Number of upvotes the bot has
* @prop {Boolean} upvoted Whether the bot has been upvoted or not
* @prop {User} owner The user object of the bot owner
* @prop {Object?} statistics The bot statistics
*/
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
        this.shortDescription = data.short_description !== '' ? data.short_description : this.shortDescription;
        this.longDescription = data.long_description !== '' ? data.long_description : this.longDescription;
        this.prefix = data.prefix !== '' ? data.prefix : this.prefix;
        this.website = data.website !== '' ? data.website : this.website;
        this.botInvite = data.bot_invite !== '' ? data.bot_invite : this.botInvite;
        this.serverInvite = data.server_invite !== '' ? data.server_invite : this.serverInvite;
        this.verified = data.verified !== undefined ? data.verified : this.verified;
        this.upvotes = data.upvotes !== undefined ? data.upvotes : this.upvotes;
        this.upvoted = data.is_upvoted !== undefined ? data.is_upvoted : this.upvoted;
    }

    get defaultAvatarURL() {
        return Constants.DefaultAvatarHashes[this.discriminator % Constants.DefaultAvatarHashes.length];
    }

    get avatarURL() {
        return this.avatar ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.png` : this.defaultAvatarURL;
    }

    /**
    * Get an array of users who have upvoted the bot
    * @returns {Promise<User[]>} Resolves with an array of User objects
    */
    getUpvoters() {
        return this._core.fetchUpvoters(this.id);
    }

    /**
    * Regenerate the bot token. Requires a userToken.
    * @returns {Promise<String>} Resolves with the new bot token
    */
    regenerateToken() {
        return this._core.generateBotToken(this.id);
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
    updateStatistics(statistics) {
        return this._core.updateBotStatistics(this.id, statistics)
    }

    /**
    * Resets bot statistics
    * @returns {Promise}
    */
    resetStatistics() {
        return this._core.resetBotStatistics(this.id)
    }

    /**
    * Deletes bot.  Requires a userToken.
    * @returns {Promise}
    */
    delete() {
        return this._core.deleteBot(this.id)
    }

    /**
    * Upvotes bot. Requires a userToken.
    * @returns {Promise}
    */
    upvote() {
        return this._core.upvoteBot(this.id)
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
    editInformation(info) {
        return this._core.updateBotInformation(this.id, info)
    }

    /**
    * Verifies bot. Requires a userToken.
    * @returns {Promise}
    */
    verify() {
        return this._core.verifyBot(this.id)
    }

    /**
    * Unverifies bot. Requires a userToken.
    * @returns {Promise}
    */
    unverify() {
        return this._core.unverifyBot(this.id)
    }

    /**
    * Refresh bot. Requires a userToken.
    * @returns {Promise}
    */
    refresh() {
        return this._core.refreshBot(this.id)
    }
}

module.exports = Bot;
