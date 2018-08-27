module.exports = {
    BOT_STATISTICS: (botId) => `https://discordbotlist.com/api/bots/${botId}/stats`,
    UPVOTE_BOT: (botId) => `https://discordbotlist.com/api/bots/${botId}/upvotes`,
    FETCH_BOT: (botId) => `https://discordbotlist.com/api/bots/${botId}`,
    FETCH_USER: (userId) => `https://discordbotlist.com/api/users/${userId}`,
    FETCH_ALL_BOTS: () => `https://discordbotlist.com/api/bots`
}