# Botlister - Javascript API wrapper for discordbotlist.com

[![npm package](https://nodei.co/npm/botlister.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/botlister/)

[![Dependency Status](https://img.shields.io/david/discordbots/botlister.svg?style=flat-square)](https://david-dm.org/discordbots/botlister)
[![Known Vulnerabilities](https://snyk.io/test/npm/botlister/badge.svg?style=flat-square)](https://snyk.io/test/npm/botlister)
[![Discord](https://img.shields.io/discord/450100127256936458.svg?style=flat-square)](https://discord.gg/hCZwQWc)


## Super simple to use

Botlister is an easy to use, zero-dependency wrapper for the discordbotlist.com API

```js
const botlister = new (require('botlister'))({ apiToken: 'abcdef', defaultBotId: '371840836423385101' })
botlister.updateBotStatistics({
    guilds: bot.guilds.size,
    users: bot.users.size,
}).catch(console.error);
```


## Table of contents

- [Examples](#examples)
- [Options](#options)
- [Getting a API token](#getting-an-api-token)
- [Methods](#methods)



---


## Examples

Need an example?
Check out the [example folder](https://github.com/discordbots/botlister/tree/master/examples)

[back to top](#table-of-contents)


---

## Options
### new Botlister(options)

- `apiToken` - (optional) The token of your Discord Bot List bot
- `userToken` - (optional) The token of your Discord Bot List account
- `defaultBotId` - (optional) The default bot ID to use when calling bot-related requests

[back to top](#table-of-contents)

---

## Getting an API token

Go to [your bots page](https://discordbotlist.com/bots/mine) and select one of your bots, then click `generate token`

[back to top](#table-of-contents)

---

## Methods

#### fetchBots()

- *Authorization*: none.
Returns an array of all bots listed (use lightly)

```js
botlister.fetchAllBots()
    .then(console.log)
    .catch(console.error)
    // return [ ... { id: "371840836423385101", ...etc } ]
```

#### fetchBot(`id`)

- *Authorization*: none.
- *Arguments*: If no ID is inputted then it will default to the `defaultBotId` option or it will throw an error if none are present.

Returns bot information for the inputted bot id

```js
botlister.fetchBot('371840836423385101')
    .then(console.log)
    .catch(console.error)
    // returns { id: "371840836423385101", ...etc }
```

#### fetchBotStatistics(`id`)

- *Authorization*: none.
- *Arguments*: If no ID is inputted then it will default to the `defaultBotId` option or it will throw an error if none are present.

Returns bot statistics for the inputted bot id

```js
botlister.fetchBotStatistics('371840836423385101')
    .then(console.log)
    .catch(console.error)
    // returns { guilds: 571, ...etc }
```

#### updateBotStatistics(`id`, `statistics`)

- *Authorization*: requires an `apiToken`.
- *Arguments*: If no ID is inputted then it will default to the `defaultBotId` option or it will throw an error if none are present.

Updates bot statistics
See the [official API documentation](https://discordbotlist.com/api-docs) for more information & fields.

```js
botlister.updateBotStatistics('371840836423385101', { guilds: 600 })
    .then(console.log)
    .catch(console.error)
    // returns nothing
```

#### resetBotStatistics(`id`)

- *Authorization*: requires an `apiToken`.
- *Arguments*: If no ID is inputted then it will default to the `defaultBotId` option or it will throw an error if none are present.

Completely resets bot statistics
See the [official API documentation](https://discordbotlist.com/api-docs) for more information.

```js
botlister.resetBotStatistics('371840836423385101')
    .then(console.log)
    .catch(console.error)
    // returns nothing
```

#### fetchUpvotes(`id`)

- *Authorization*: none.
- *Arguments*: If no ID is inputted then it will default to the `defaultBotId` option or it will throw an error if none are present.

Fetches an array of users who upvoted the inputted bot

```js
botlister.fetchUpvotes('392470264136597516')
    .then(console.log)
    .catch(console.error)
    // return [ ... { id: "371840836423385101", ...etc } ]
```

#### fetchUser(`id`)

- *Authorization*: none.
- *Arguments*: requires a user ID.

Fetches user information

```js
botlister.fetchUser('392470264136597516')
    .then(console.log)
    .catch(console.error)
    // returns { id: "371840836423385101", ...etc }
```

#### fetchUserBots(`id`)

- *Authorization*: none.
- *Arguments*: requires a user ID.

Fetches a user's listed bots

```js
botlister.fetchUserBots('392470264136597516')
    .then(console.log)
    .catch(console.error)
    // return [ ... { id: "371840836423385101", ...etc } ]
```

#### upvoteBot(`id`)

- *Authorization*: requires an `userToken`.
- *Arguments*: If no ID is inputted then it will default to the `defaultBotId` option or it will throw an error if none are present.

Upvotes a bot using the `userToken`

```js
botlister.upvoteBot('392470264136597516')
    .then(console.log)
    .catch(console.error)
    // returns nothing
```

#### deleteBot(`id`)

- *Authorization*: requires an `userToken`.
- *Arguments*: If no ID is inputted then it will default to the `defaultBotId` option or it will throw an error if none are present.

Deletes a bot using the `userToken`

```js
botlister.deleteBot('392470264136597516')
    .then(console.log)
    .catch(console.error)
    // returns nothing
```

#### updateBotInformation(`id`, `data`)

- *Authorization*: requires an `userToken`.
- *Arguments*: If no ID is inputted then it will default to the `defaultBotId` option or it will throw an error if none are present.

Updates bot information

**Optional fields:**
- `bot_invite` - Discord OAuth URL for your bot
- `server_invite` - Discord invite for your bot's server
- `website` - Website for your bot
- `long_description` - Long description
- `short_description` - Short description
- `prefix` - Prefix of your bot

```js
botlister.updateBotInformation('371840836423385101', { prefix: '-' })
    .then(console.log)
    .catch(console.error)
    // returns nothing
```

#### addBot(`data`)

- *Authorization*: requires an `userToken`.
- *Arguments*: requires data.

Adds a bot to the list

**Fields:**
- `id` - ID of your bot
- `bot_invite` - Discord OAuth URL for your bot
- `server_invite` - Discord invite for your bot's server
- `website` - Website for your bot
- `long_description` - Long description
- `short_description` - Short description
- `prefix` - Prefix of your bot

```js
botlister.addBot({ id: '666' })
    .then(console.log)
    .catch(console.error)
    // returns nothing
```

[back to top](#table-of-contents)

---

## Repository information

Maintained by [Wright](https://github.com/wr1ght)

Contact me on Discord `wright#0666`

[back to top](#table-of-contents)
