'use strict';

const fs = require('fs');
const path = require('path');
require('log-timestamp');
const Parser = require('rss-parser');
const axios = require("axios");
const config = require('./config.js');

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
  const storage = path.resolve(__dirname + '/.storage');
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

async function postMessage(item) {
  const url = 'https://api.telegram.org/bot' + config.telegramBotToken + '/sendMessage';
  const response = await axios.post(url, {
    chat_id: config.telegramChatId,
    text: item.link
  });

  return response.data;
}

getNewestItem()
  .then(validateNewestItem)
  .then(postMessage)
  .then(JSON.stringify)
  .then(console.log)
  .catch(console.log);