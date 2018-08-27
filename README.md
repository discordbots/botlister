
# Botlister
## A Javascript wrapper for the discordbotlist.com API
<a href="https://www.npmjs.com/package/botlister"><img src="https://img.shields.io/npm/v/botlister.svg?maxAge=3600" alt="NPM version" /></a><a href="https://www.npmjs.com/package/botlister"><img src="https://img.shields.io/npm/dt/botlister.svg?maxAge=3600" alt="NPM downloads" /></a><a href="https://david-dm.org/wr1ght/botlister"><img src="https://img.shields.io/david/wr1ght/botlister.svg?maxAge=3600" alt="Dependencies" /></a>

### Contents

* [How to use](#how-to-use)

* [License](#license)

------------------

#### How to use
This is a zero-dependency package.
##### Step One: Getting an API token for your bot

Go to [your bots page](https://discordbotlist.com/bots/mine) and select one of your bots, then click **generate token**

###### optional: find and get your account token to use functions such as `upvoteBot` and `deleteBot`

##### Step Two: Integrate the package into your application
* `apiToken` : (optional) The token of your Discord Bot List bot
* `userToken`: (optional) The token of your Discord Bot List account
* `defaultBotId`: (optional) The default bot ID to use when calling bot-related requests

**Example:**
```js
    const BLister = require('botlister');
    const botlister = new BLister({
        apiToken: 'memes',
        defaultBotId: '371840836423385101'
    });
    botlister.fetchBot().then(console.log);
```
  

#### Documentation

##### `fetchAllBots()`
###### Authorization required: no

This function returns an array of all bots. Use lightly.
```js
    botlister.fetchAllBots().then(console.log);
    // RETURNS [... <Bot Object> ]
```

##### `fetchBot(id)`
###### Authorization required: no
###### If no ID is supplied it will default to the defaultBotId

This function returns bot information.
```js
    botlister.fetchBot('371840836423385101').then(console.log);
    // RETURNS <Bot Object>

    botlister.fetchBot().then(console.log);
    // RETURNS <Bot Object> for defaultBotId
```

##### `fetchBotStatistics(id)`
###### If no ID is supplied it will default to the defaultBotId
###### Authorization required: no

This function returns bot statistics.
```js
    botlister.fetchBotStatistics('371840836423385101').then(console.log);
    // RETURNS <Bot Object>.stats

    botlister.fetchBotStatistics().then(console.log);
    // RETURNS <Bot Object>.stats for defaultBotId
```

##### `updateBotStatistics(id, statistics)`
###### If no ID is supplied it will default to the defaultBotId
###### Authorization required: yes (`apiToken`)

This function updates bot statistics.
See the official [API documentation](https://discordbotlist.com/api-docs) for fields.
```js
    botlister.updateBotStatistics('371840836423385101', { users: 1337 }).then(console.log);
    // RETURNS nothing

    botlister.updateBotStatistics({ users: 1337 }).then(console.log);
    // ID defaults to defaultBotId
    // RETURNS nothing
```

##### `resetBotStatistics(id)`
###### If no ID is supplied it will default to the defaultBotId
###### Authorization required: yes (`apiToken`)

This function resets all bot statistics.
See the official [API documentation](https://discordbotlist.com/api-docs) for more information.
```js
    botlister.resetBotStatistics('371840836423385101').then(console.log);
    // RETURNS nothing

    botlister.resetBotStatistics().then(console.log);
    // ID defaults to defaultBotId
    // RETURNS nothing
```

##### `deleteBot(id)`
###### If no ID is supplied it will default to the defaultBotId
###### Authorization required: yes (`userToken`)

This function deletes the bot from Discord Bot List
```js
    botlister.deleteBot('371840836423385101').then(console.log);
    // RETURNS nothing

    botlister.deleteBot().then(console.log);
    // ID defaults to defaultBotId
    // RETURNS nothing
```

##### `upvoteBot(id)`
###### If no ID is supplied it will default to the defaultBotId
###### Authorization required: yes (`userToken`)

This function upvotes a bot
```js
    botlister.upvoteBot('371840836423385101').then(console.log);
    // RETURNS nothing

    botlister.upvoteBot().then(console.log);
    // ID defaults to defaultBotId
    // RETURNS nothing
```

##### `fetchUser(id)`
###### Authorization required: no

This function returns user information
```js
    botlister.fetchUser('392470264136597516').then(console.log);
    // RETURNS <User Object>
```

##### `fetchUserBots(id)`
###### Authorization required: no

This function returns an array of user's bots
```js
    botlister.fetchUserBots('392470264136597516').then(console.log);
    // RETURNS [ ... <Bot Object>]
```

#### License

This repository has been released under the MIT license.
------------------

<p>Repo maintained by Wright (wr1ght)
Contact me on Discord: wright#0666</p>

 