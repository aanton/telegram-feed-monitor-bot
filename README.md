# Telegram feed monitor bot

Telegram bot that monitors a feed, detects when the newest post has changed & sends it to a Telegram chat.

See a [Telegram bot that monitors a block of a webpage](https://github.com/aanton/telegram-webpage-monitor-bot).

## Installation

1. Clone this repository
2. Install dependencies: `npm install`
3. Create the configuration file `config.js` copying `config.example.js` and filling it properly (see below)

## Configuration parameters

* `feed`: Feed URL to monitor
* `telegramBotToken`: Telegram bot token
  * Create a [Telegram bot](https://core.telegram.org/bots) using [@BotFather](https://telegram.me/botfather)
* `telegramChatId`: Telegram chat identifier
  * It can be a private conversation with the bot (you must send previously a message to the bot), a group conversation (the bot must be a member) or a channel conversation (the bot must be an administrator member)
  * The chat identifier can be obtained using [@ChannelIdBot](https://t.me/ChannelIdBot)

```js
// config.js
const config = {
  feed: '',
  telegramBotToken: '',
  telegramChatId: ''
}

module.exports = config;
```

## Usage

* Run `node index.js` manually to verify it is working properly
* Run it periodically using a crontab or a similar tool