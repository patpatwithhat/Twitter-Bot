const twit = require("twit");
const fs = require('fs');

const { consumer_key, consumer_secret, access_token, access_token_secret } = JSON.parse(fs.readFileSync('data/data.json', 'utf8'))

const T = new twit({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token: access_token,
  access_token_secret: access_token_secret,
});

module.exports = T;

