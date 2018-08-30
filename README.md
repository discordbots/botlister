# Botlister - NodeJS library for discordbotlist.com

[![npm package](https://nodei.co/npm/botlister.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/botlister/)

[![Dependency Status](https://img.shields.io/david/discordbots/botlister.svg?style=flat-square)](https://david-dm.org/discordbots/botlister)
[![Known Vulnerabilities](https://snyk.io/test/npm/botlister/badge.svg?style=flat-square)](https://snyk.io/test/npm/botlister)
[![Discord](https://img.shields.io/discord/450100127256936458.svg?style=flat-square&label=Discord%20Bot%20List%20Server)](https://discord.gg/hCZwQWc)


## Super simple to use

Botlister is an easy to use, zero-dependency NodeJS library for the discordbotlist.com

```js
const botlister = new (require('botlister'))({ apiToken: 'abcdef', defaultBotId: '371840836423385101' })
botlister.updateBotStatistics({
    guilds: bot.guilds.size,
    users: bot.users.size,
}).catch(console.error);

// OR
const dblBot = await botlister.fetchBot('1111');
console.log(dblBot.statistics);
dblBot.updateStatistics({ guilds: 1 });

// read docs for more coolness
```


## Table of contents

- [Examples](#examples)
- [Getting a API token](#getting-an-api-token)
- [Documentation](#documentation)

---


## Examples

Need an example?
Check out the [example folder](https://github.com/discordbots/botlister/tree/master/examples)

[back to top](#table-of-contents)

---

## Getting an API token

Go to [your bots page](https://discordbotlist.com/bots/mine) and select one of your bots, then click `generate token`

[back to top](#table-of-contents)

---

## Documentation

-   [Core][1]
    -   [Parameters][2]
    -   [fetchPopularBots][3]
    -   [fetchAllBots][4]
        -   [Parameters][5]
    -   [searchBots][6]
        -   [Parameters][7]
    -   [fetchMyBots][8]
        -   [Parameters][9]
    -   [fetchBot][10]
        -   [Parameters][11]
    -   [fetchUpvoters][12]
        -   [Parameters][13]
    -   [generateBotToken][14]
        -   [Parameters][15]
    -   [updateBotStatistics][16]
        -   [Parameters][17]
    -   [resetBotStatistics][18]
        -   [Parameters][19]
    -   [deleteBot][20]
        -   [Parameters][21]
    -   [upvoteBot][22]
        -   [Parameters][23]
    -   [updateBotInformation][24]
        -   [Parameters][25]
    -   [addBot][26]
        -   [Parameters][27]
    -   [fetchUser][28]
        -   [Parameters][29]
    -   [banUser][30]
        -   [Parameters][31]
    -   [unbanUser][32]
        -   [Parameters][33]
    -   [refreshUser][34]
        -   [Parameters][35]
    -   [fetchUninvitedBots][36]
    -   [verifyBot][37]
        -   [Parameters][38]
    -   [unverifyBot][39]
        -   [Parameters][40]
    -   [refreshBot][41]
        -   [Parameters][42]
    -   [fetchConfiguration][43]
    -   [lockDatabase][44]
    -   [unlockDatabase][45]
-   [Bot][46]
    -   [Parameters][47]
    -   [Properties][48]
    -   [getUpvoters][49]
    -   [regenerateToken][50]
    -   [updateStatistics][51]
        -   [Parameters][52]
    -   [resetStatistics][53]
    -   [delete][54]
    -   [upvote][55]
    -   [editInformation][56]
        -   [Parameters][57]
    -   [verify][58]
    -   [unverify][59]
    -   [refresh][60]
-   [User][61]
    -   [Parameters][62]
    -   [Properties][63]
    -   [ban][64]
    -   [unban][65]
    -   [refresh][66]

## Core

Represents main library

### Parameters

-   `options` **[Object][67]?** Botlister options (all options are optional)
    -   `options.apiToken` **[String][68]** bot api token (optional, default `null`)
    -   `options.defaultBotId` **[String][68]** Default bot ID to use when calling bot-related functions (optional, default `null`)
    -   `options.userToken` **[String][68]** user account token (optional, default `null`)

### fetchPopularBots

Fetch an array of "hot" or "popular" bots

Returns **[Promise][69]&lt;[Array][70]&lt;[Bot][71]>>** Resolves with an array of Bot objects

### fetchAllBots

Fetch an array of all bots on the website. Use lightly.

#### Parameters

-   `skip` **[Number][72]** Amount of bots to skip (optional, default `0`)

Returns **[Promise][69]&lt;[Array][70]&lt;[Bot][71]>>** Resolves with an array of Bot objects

### searchBots

Search through all bots with a search term.

#### Parameters

-   `searchTerm` **[String][68]?** The search term to use (optional, default `''`)

Returns **[Promise][69]&lt;[Array][70]&lt;[Bot][71]>>** Resolves with an array of Bot objects

### fetchMyBots

Fetch the current user's bots. Requires a userToken.

#### Parameters

-   `skip` **[Number][72]** Amount of bots to skip (optional, default `0`)

Returns **[Promise][69]&lt;[Array][70]&lt;[Bot][71]>>** Resolves with an array of Bot objects

### fetchBot

Fetch a bot

#### Parameters

-   `id` **[String][68]?** The ID of the bot to fetch, defaults to the defaultBotId (if one is set) (optional, default `this.defaultBotId`)

Returns **[Promise][69]&lt;[Bot][71]>** Resolves with a Bot object

### fetchUpvoters

Fetch an array of users who upvoted the bot

#### Parameters

-   `id` **[String][68]?** The ID of the bot to fetch upvoters for, defaults to the defaultBotId (if one is set) (optional, default `this.defaultBotId`)

Returns **[Promise][69]&lt;[Array][70]&lt;[User][73]>>** Resolves with an array of User objects

### generateBotToken

Re-generates the bot API token. Requires a userToken.

#### Parameters

-   `id` **[String][68]?** The ID of the bot, defaults to the defaultBotId (if one is set) (optional, default `this.defaultBotId`)

Returns **[Promise][69]&lt;[String][68]>** Resolves with a new apiToken

### updateBotStatistics

Updates bot statistics. Requires an apiToken.

#### Parameters

-   `id` **[String][68]?** The ID of the bot, defaults to the defaultBotId (if one is set) (optional, default `this.defaultBotId`)
-   `statistics` **[Object][67]** Statistics to send
    -   `statistics.shardId` **[Number][72]?** Shard ID to send data for
    -   `statistics.guilds` **[Number][72]?** Amount of guilds
    -   `statistics.users` **[Number][72]?** Amount of users
    -   `statistics.voiceConnections` **[Number][72]?** Amount of voice connections

Returns **[Promise][69]**

### resetBotStatistics

Resets bot statistics. Requires an apiToken.

#### Parameters

-   `id` **[String][68]?** The ID of the bot, defaults to the defaultBotId (if one is set) (optional, default `this.defaultBotId`)

Returns **[Promise][69]**

### deleteBot

Deletes the bot. Requires a userToken.

#### Parameters

-   `id` **[String][68]?** The ID of the bot, defaults to the defaultBotId (if one is set) (optional, default `this.defaultBotId`)

Returns **[Promise][69]**

### upvoteBot

Upvotes the bot with the user's account. Requires a userToken.

#### Parameters

-   `id` **[String][68]?** The ID of the bot, defaults to the defaultBotId (if one is set) (optional, default `this.defaultBotId`)

Returns **[Promise][69]**

### updateBotInformation

Updates/edits the bot information on the website. Requires a userToken.

#### Parameters

-   `id` **[String][68]?** The ID of the bot, defaults to the defaultBotId (if one is set) (optional, default `this.defaultBotId`)
-   `info` **[Object][67]** Updated bot information
    -   `info.shortDescription` **[String][68]?** Short description
    -   `info.longDescription` **[String][68]?** Long description
    -   `info.prefix` **[String][68]?** Bot prefix
    -   `info.website` **[String][68]?** Bot website
    -   `info.botInvite` **[String][68]?** Bot invite
    -   `info.serverInvite` **[String][68]?** Server invite

Returns **[Promise][69]**

### addBot

Submits a new bot to the website. Requires a userToken.

#### Parameters

-   `info` **[Object][67]** Bot information
    -   `info.id` **[String][68]** The ID of the bot, defaults to the defaultBotId (if one is set)
    -   `info.shortDescription` **[String][68]** Short description
    -   `info.longDescription` **[String][68]?** Long description
    -   `info.prefix` **[String][68]** Bot prefix
    -   `info.website` **[String][68]?** Bot website
    -   `info.botInvite` **[String][68]** Bot invite
    -   `info.serverInvite` **[String][68]?** Server invite

Returns **[Promise][69]**

### fetchUser

Fetch a user

#### Parameters

-   `id` **[String][68]** The ID of the user

Returns **[Promise][69]&lt;[User][73]>**

### banUser

Ban a user. Requires a userToken. Requires admin.

#### Parameters

-   `id` **[String][68]** The ID of the user

Returns **[Promise][69]**

### unbanUser

Unban a user. Requires a userToken. Requires admin.

#### Parameters

-   `id` **[String][68]** The ID of the user

Returns **[Promise][69]**

### refreshUser

Refresh a user. Requires a userToken. Requires admin.

#### Parameters

-   `id` **[String][68]** The ID of the user

Returns **[Promise][69]**

### fetchUninvitedBots

Fetch an array of bots that are not in the DBL server. Requires a userToken. Requires admin.

Returns **[Promise][69]&lt;[Array][70]&lt;[Bot][71]>>** Resolves with an array of Bot objects

### verifyBot

Verify a bot. Requires a userToken. Requires admin.

#### Parameters

-   `id` **[String][68]** The ID of the bot

Returns **[Promise][69]**

### unverifyBot

Unverify a bot. Requires a userToken. Requires admin.

#### Parameters

-   `id` **[String][68]** The ID of the user

Returns **[Promise][69]**

### refreshBot

Refresh a bot. Requires a userToken. Requires admin.

#### Parameters

-   `id` **[String][68]** The ID of the user

Returns **[Promise][69]**

### fetchConfiguration

Fetch DBL configuration. Requires a userToken. Requires admin.

Returns **[Promise][69]&lt;[Object][67]>** {"db_locked": true}

### lockDatabase

Lock database. Requires a userToken. Requires admin.

Returns **[Promise][69]**

### unlockDatabase

Unlock database. Requires a userToken. Requires admin.

Returns **[Promise][69]**

## Bot

Represents a DBL bot

### Parameters

-   `data`
-   `core`

### Properties

-   `id` **[String][68]** The ID of the bot
-   `createdAt` **Timestamp** Timestamp of when the bot was added to DBL
-   `lastUpdatedAt` **Timestamp** Timestamp of when the bot was last updated
-   `avatar` **[String][68]?** The hash of the bot's avatar, or null if no avatar
-   `defaultAvatarURL` **[String][68]** The URL of the bot's default avatar
-   `avatarURL` **[String][68]** The URL of the bot's avatar
-   `username` **[String][68]** The username of the bot
-   `discriminator` **[String][68]** The discriminator of the bot
-   `shortDescription` **[String][68]** The short description of the bot
-   `longDescription` **[String][68]** The long description of the bot
-   `prefix` **[String][68]** The bot prefix
-   `website` **[String][68]** The bot website
-   `botInvite` **[String][68]** The invite to the bot
-   `serverInvite` **[String][68]** Server invite
-   `verified` **[Boolean][74]** Whether the bot is verified or not
-   `upvotes` **[Number][72]** Number of upvotes the bot has
-   `upvoted` **[Boolean][74]** Whether the bot has been upvoted or not
-   `owner` **[User][73]** The user object of the bot owner
-   `statistics` **[Object][67]?** The bot statistics

### getUpvoters

Get an array of users who have upvoted the bot

Returns **[Promise][69]&lt;[Array][70]&lt;[User][73]>>** Resolves with an array of User objects

### regenerateToken

Regenerate the bot token. Requires a userToken.

Returns **[Promise][69]&lt;[String][68]>** Resolves with the new bot token

### updateStatistics

Updates bot statistics. Requires an apiToken.

#### Parameters

-   `statistics` **[Object][67]** Statistics to send
    -   `statistics.shardId` **[Number][72]?** Shard ID to send data for
    -   `statistics.guilds` **[Number][72]?** Amount of guilds
    -   `statistics.users` **[Number][72]?** Amount of users
    -   `statistics.voiceConnections` **[Number][72]?** Amount of voice connections
-   `id` **[String][68]?** The ID of the bot, defaults to the defaultBotId (if one is set)

Returns **[Promise][69]**

### resetStatistics

Resets bot statistics

Returns **[Promise][69]**

### delete

Deletes bot.  Requires a userToken.

Returns **[Promise][69]**

### upvote

Upvotes bot. Requires a userToken.

Returns **[Promise][69]**

### editInformation

Updates/edits the bot information on the website. Requires a userToken.

#### Parameters

-   `info` **[Object][67]** Updated bot information
    -   `info.shortDescription` **[String][68]?** Short description
    -   `info.longDescription` **[String][68]?** Long description
    -   `info.prefix` **[String][68]?** Bot prefix
    -   `info.website` **[String][68]?** Bot website
    -   `info.botInvite` **[String][68]?** Bot invite
    -   `info.serverInvite` **[String][68]?** Server invite
-   `id` **[String][68]?** The ID of the bot, defaults to the defaultBotId (if one is set)

Returns **[Promise][69]**

### verify

Verifies bot. Requires a userToken.

Returns **[Promise][69]**

### unverify

Unverifies bot. Requires a userToken.

Returns **[Promise][69]**

### refresh

Refresh bot. Requires a userToken.

Returns **[Promise][69]**

## User

Represents a DBL user

### Parameters

-   `data`
-   `core`

### Properties

-   `id` **[String][68]** The ID of the user
-   `createdAt` **Timestamp** Timestamp of when the user was added to DBL
-   `avatar` **[String][68]?** The hash of the user's avatar, or null if no avatar
-   `defaultAvatarURL` **[String][68]** The URL of the user's default avatar
-   `avatarURL` **[String][68]** The URL of the user's avatar
-   `username` **[String][68]** The username of the user
-   `discriminator` **[String][68]** The discriminator of the user
-   `admin` **[Boolean][74]** Whether the user is an administrator or not
-   `banned` **[Boolean][74]** Whether the user is banned or not
-   `bots` **[Array][70]&lt;[Bot][71]>** Array of Bot objects that belong to the user

### ban

Ban user. Requires userToken.

Returns **[Promise][69]**

### unban

Unban user. Requires userToken.

Returns **[Promise][69]**

### refresh

Refresh user. Requires userToken.

Returns **[Promise][69]**

[1]: #core

[2]: #parameters

[3]: #fetchpopularbots

[4]: #fetchallbots

[5]: #parameters-1

[6]: #searchbots

[7]: #parameters-2

[8]: #fetchmybots

[9]: #parameters-3

[10]: #fetchbot

[11]: #parameters-4

[12]: #fetchupvoters

[13]: #parameters-5

[14]: #generatebottoken

[15]: #parameters-6

[16]: #updatebotstatistics

[17]: #parameters-7

[18]: #resetbotstatistics

[19]: #parameters-8

[20]: #deletebot

[21]: #parameters-9

[22]: #upvotebot

[23]: #parameters-10

[24]: #updatebotinformation

[25]: #parameters-11

[26]: #addbot

[27]: #parameters-12

[28]: #fetchuser

[29]: #parameters-13

[30]: #banuser

[31]: #parameters-14

[32]: #unbanuser

[33]: #parameters-15

[34]: #refreshuser

[35]: #parameters-16

[36]: #fetchuninvitedbots

[37]: #verifybot

[38]: #parameters-17

[39]: #unverifybot

[40]: #parameters-18

[41]: #refreshbot

[42]: #parameters-19

[43]: #fetchconfiguration

[44]: #lockdatabase

[45]: #unlockdatabase

[46]: #bot

[47]: #parameters-20

[48]: #properties

[49]: #getupvoters

[50]: #regeneratetoken

[51]: #updatestatistics

[52]: #parameters-21

[53]: #resetstatistics

[54]: #delete

[55]: #upvote

[56]: #editinformation

[57]: #parameters-22

[58]: #verify

[59]: #unverify

[60]: #refresh

[61]: #user

[62]: #parameters-23

[63]: #properties-1

[64]: #ban

[65]: #unban

[66]: #refresh-1

[67]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[68]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[69]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[70]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[71]: #bot

[72]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[73]: #user

[74]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[back to top](#table-of-contents)

---

## Repository information

Maintained by [Wright](https://github.com/wr1ght)

Contact me on Discord `wright#0666`

[back to top](#table-of-contents)
