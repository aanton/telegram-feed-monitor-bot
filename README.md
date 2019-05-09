# Telegram feed monitor bot

Telegram bot that monitors a feed, detects when the newest post has changed & send it to a Telegram chat.

## Installation

1. Clone this repository
2. Install dependencies: `npm install`
3. Create the file `config.json` copying `config.example.json` and filling it properly

## Configuration

* Feed URL to monitor
* Telegram bot token
  * Create a [Telegram bot](https://core.telegram.org/bots) using [BotFather](https://telegram.me/botfather)
* Telegram chat identifier
  * It can be a private conversation with the bot (you must send previously a message to the bot), a group conversation (the bot must be a member) or a channel conversation (the bot must be an administrator member)
  * The chat identifier can be obtained checking the bot updates
    * Send a message to the private/group/channel conversation
    * Check the bot updates in https://api.telegram.org/bot[BOT-TOKEN]/getUpdates & look for `chat.id` in the sent message

## Usage

* Run `node index.js` manually to verify it is working properly
* Run it periodically using a crontab or a similar tool