# Twitter-Bot
Keep on track with your favorite Twitter accounts and redirect their tweets to your WhatsApp number if you are as lazy as me and don't open Twitter on a regular basis.<br>
In this example, I redirect all Tweets of Elon Musk to my WhatsApp number.<br>

# How to use
0. Install node.js if needed: https://nodejs.org/en/download/
1. Create a dev account for the Twitter API if you don't already have one: https://developer.twitter.com/en 
2. Register your WhatsApp number on callmebot.com (cmb): Follow: https://www.callmebot.com/blog/free-api-whatsapp-messages/
3. Insert your Twitter API keys and cmb key in the data/data.json
4. Run "node bot.js"

# Customize bot.js
The bot makes a request to the Twitter API every 10 seconds.<br>
customize here (millis) <br>
```javascript
    setInterval(main, 10000);
```

If you want to look for other accounts etc: <br>
check the getTweets() function<br>
Adjust the params object<br>

Look for an account name and get the last 2 tweets (if the bot runs 24/7 it's not necessary to get more than 2 tweets per cycle)

```javascript
        let params = {
            from: 'elonmusk',
            count: 2
        };
```

Look for a hashtag and get the last 10 tweets

```javascript
        let params = {
            q: '#funstuff',
            count: 10
        };
```

# Note
All tweets get collected into one message sent by cmb due to cmb only allowing 25 messages per 240 minutes.<br>
If this changes someday, you could also send every tweet in one message.<br>

In the params.json the id of the last tweets gets saved to not redirect the same tweet multiple times.<br>

# Sources
Check out for a basic understanding of the Twitter API: Level Up Developer: https://www.youtube.com/watch?v=0gFzUYSbJwY <br>
Used for WhatsApp connection: https://www.callmebot.com/blog/free-api-whatsapp-messages/<br>
