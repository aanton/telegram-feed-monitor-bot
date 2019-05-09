'use strict';

// https://github.com/yagop/node-telegram-bot-api/issues/319
process.env.NTBA_FIX_319 = 1;

const fs = require('fs');
const path = require('path');
require('log-timestamp');
const Parser = require('rss-parser');
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');

async function getNewestItem() {
  let parser = new Parser();
  let feed = await parser.parseURL(config.feed);
  if (feed.items.length < 1) {
    return Promise.reject('ERROR: No items');
  }

  let newestItem = feed.items[0];
  return {
    title: newestItem.title,
    link: newestItem.link
  };
}

async function validateNewestItem(item) {
  const storage = path.resolve(__dirname + '/storage.json');
  let previousNewestItem = false;
  if (fs.existsSync(storage)) {
    previousNewestItem = JSON.parse(fs.readFileSync(storage, 'utf8'));
  }

  if (previousNewestItem && previousNewestItem.link === item.link) {
    return Promise.reject('Newest item has not changed');
  }

  fs.writeFileSync(storage, JSON.stringify(item), 'utf8');
  return item;
}

function postMessage(item) {
  let bot = new TelegramBot(config.telegramBotToken);
  return bot.sendMessage(config.telegramChatId, item.link);
}

getNewestItem()
  .then(validateNewestItem)
  .then(postMessage)
  .then(JSON.stringify)
  .then(console.log)
  .catch(console.log);