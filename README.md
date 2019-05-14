# Telegram feed monitor bot

This project has been deprecated. Use the package [@aanton/telegram-webpage-monitor-bot](https://www.npmjs.com/package/@aanton/telegram-webpage-monitor-bot).

## Example using @aanton/telegram-webpage-monitor-bot

```js
const path = require('path');
const monitorWebpage = require('@aanton/telegram-webpage-monitor-bot');
const Parser = require('rss-parser');

const FEED_URL='';
const TELEGRAM_BOT_TOKEN='';
const TELEGRAM_CHAT_ID='';

const extractFistItemSnippet = async function(html) {
  const parser = new Parser();
  const feed = await parser.parseString(html);
  if (feed.items.length < 1) {
    return Promise.reject('ERROR: No items');
  }

  return feed.items[0].link;
};

monitorWebpage({
  name: 'first-link-monitor',
  url: FEED_URL,
  storage: path.resolve(__dirname + '/.storage'),
  telegramBotToken: TELEGRAM_BOT_TOKEN,
  telegramChatId: TELEGRAM_CHAT_ID,
  extractSnippet: extractFistItemSnippet
})
  .then(JSON.stringify)
  .then(console.log)
  .catch(console.log);
```
