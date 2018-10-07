const Constants = require('../utility/Constants');

/**
* Represents a DBL user
* @prop {String} id The ID of the user
* @prop {Timestamp} createdAt Timestamp of when the user was added to DBL
* @prop {String?} avatar The hash of the user's avatar, or null if no avatar
* @prop {String} defaultAvatarURL The URL of the user's default avatar
* @prop {String} avatarURL The URL of the user's avatar
* @prop {String} username The username of the user
* @prop {String} discriminator The discriminator of the user
* @prop {Boolean} admin Whether the user is an administrator or not
* @prop {Boolean} banned Whether the user is banned or not
* @prop {Array<Bot>} bots Array of Bot objects that belong to the user
*/
class User {
    constructor(data, core) {
        this._core = core;
        this.id = data.id;
        this.createdAt = data.created_at;

        this.update(data);
    }

    update(data) {
        const Bot = require('./Bot');
        this.avatar = data.avatar || this.avatar;
        this.username = data.username || this.username;
        this.discriminator = data.discriminator || this.discriminator;
        this.admin = data.admin || this.admin;
        this.banned = data.banned || this.banned;
        this.bots = data.bots ? data.bots.map(b => (new Bot(b, this._core))) : this.bots;
    }

    get defaultAvatarURL() {
        return Constants.DefaultAvatarHashes[this.discriminator % Constants.DefaultAvatarHashes.length];
    }

    get avatarURL() {
        return this.avatar ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.png` : this.defaultAvatarURL;
    }

    /**
    * Ban user. Requires userToken. 
    * @returns {Promise}
    */
    ban() {
        return this._core.banUser(this.id);
    }

    /**
    * Unban user. Requires userToken. 
    * @returns {Promise}
    */
    unban() {
        return this._core.unbanUser(this.id);
    }

    /**
    * Refresh user. Requires userToken. 
    * @returns {Promise}
    */
    refresh() {
        return this._core.refreshUser(this.id)
    }

}

module.exports = User;
