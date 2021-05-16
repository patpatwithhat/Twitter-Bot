const twit = require("./twit");
const axios = require('axios')
const fs = require("fs");
const path = require("path");
const paramsPath = path.join(__dirname, "params.json");
const URL = require('url')


const { cmb_api_key, cmb_phone_number } = JSON.parse(fs.readFileSync('data/data.json', 'utf8'))


function writeParams(data) {
    console.log("Writing params file ...", data);
    return fs.writeFileSync(paramsPath, JSON.stringify(data));
}

function readParams() {
    console.log("Reading params file ...");
    const data = fs.readFileSync(paramsPath);
    return JSON.parse(data.toString());
}

function getTweets(since_id) {
    return new Promise((resolve, reject) => {
        let params = {
            from: 'elonmusk',
            count: 2
        };
        if (since_id) {
            params.since_id = since_id;
        }
        console.log("We are getting tweets ...", params);
        twit.get("search/tweets", params, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}

function sendWhatsappMsg(msg) {
    return new Promise((resolve, reject) => {
        let url = `https://api.callmebot.com/whatsapp.php?phone=${cmb_phone_number}&text=${encodeURIComponent(msg)}&apikey=${cmb_api_key}`
        axios.post(url).then((data) => {
            if (data.status != 200 || data.data.includes("ERROR")) {
                console.log("cmb data content: " + data.data)
                return reject("Sending msg failed. Check for correct key and phonenumber pair for cmb!")
            }
            return resolve(data)
        })
    })
}

async function main() {
    try {
        const params = readParams();
        const data = await getTweets(params.since_id);
        const tweets = data.statuses;
        if (tweets.length <= 0) {
            console.log("No new tweets... ")
            return
        }
        console.log("Amount tweets found: ", tweets.length)
        let msg = "Most recent tweets: \n"
        for await (let tweet of tweets) {
            try {
                msg += tweet.text + "\n\n"
            } catch (e) {
                console.log("Error with tweet id: " + tweet.id_str);
            }
        }
        sendWhatsappMsg(msg)
            .then(function (res) {
                console.log("Tweet successful redirected to WhatsApp");
            })
            .catch(function (err) {
                console.log(err)
            })
        params.since_id = tweets[0].id_str;
        writeParams(params);
    } catch (e) {
        console.error(e);
    }
}

console.log("Starting Twitter redirecting bot ...");
main()
setInterval(main, 10000);