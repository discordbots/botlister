const Constants = require('../utility/Constants');
const Bot = require('./Bot');

class User {
    constructor(data, core) {
        this._core = core;
        this.id = data.id;
        this.createdAt = data.created_at;

        this.update(data);
    }

    update(data) {
        this.avatar = data.avatar !== undefined ? data.avatar : this.avatar;
        this.username = data.username !== undefined ? data.username : this.username;
        this.discriminator = data.discriminator !== undefined ? data.discriminator : this.discriminator;
        this.admin = data.admin !== undefined ? data.admin : this.admin;
        this.banned = data.banned !== undefined ? data.banned : this.banned;
        this.bots = data.bots !== undefined ? data.bots.map(bot => new Bot(bot, this._core)) : this.bots;
    }

    get defaultAvatarURL() {
        return Constants.DefaultAvatarHashes[this.discriminator % Constants.DefaultAvatarHashes.length];
    }

    get avatarURL() {
        return this.avatar ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.png` : this.defaultAvatarURL;
    }

    ban() {
        return this._core.banUser(this.id);
    }

    unban() {
        return this._core.unbanUser(this.id);
    }

    refresh() {
        return this._core.refreshUser(this.id)
    }

}

module.exports = User;