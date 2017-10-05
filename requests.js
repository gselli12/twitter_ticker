//requiring necessary stuff
const https = require("https");
const login = require(__dirname + "/secrets.json");

//decalring function getToken
var getToken = (callback) => {

    //options for POST request
    let options = {
        method: "POST",
        host: "api.twitter.com",
        path: "/oauth2/token",
        headers: {
            "Authorization": "Basic " + new Buffer(login.consumerKey + ":" + login.consumerSecret).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    };

    //making POST request
    const req = https.request(options, function(res) {

        if(res.statusCode != 200) {
            callback(res.statusCode);
            return;
        }

        let body = "";
        //on data, feeding data into body
        res.on("data", chunk => body += chunk).on("end", () => {
            //on end, calling callback with access token as an argument
            try {
                body =  JSON.parse(body);
                callback(null, body.access_token);
            } catch (err) {
                callback(err);
            }
        });
    });

    //writing necessary message to request and ending POST request
    req.write("grant_type=client_credentials");
    req.end();
};

//declaring function getTweets
var getTweets = (token, profile,  callback) => {

    //options for GET request
    let options = {
        method: "GET",
        host: "api.twitter.com",
        path: "/1.1/statuses/user_timeline.json?screen_name=" + profile + "&count=10",
        headers: {
            "Authorization": "Bearer " + token
        }
    };

    //making GET request
    const tweetReq = https.request(options, function(res) {

        if(res.statusCode != 200) {
            console.log("Something went wrong: " + res.statusCode);
            return;
        }

        console.log("Successful request: " + res.statusCode);
        let body = "";
        //on data feeding data into body
        res.on("data", chunk => body += chunk).on("end", () => {
            //on end, calling callback with object as an argument (that object contains the tweets)
            try {
                body = JSON.parse(body);
                callback(null, body);
            }
            catch (err) {
                callback(err);
            }
        });
    });

    //ending GET request
    tweetReq.end();
};

module.exports.getTweets = getTweets;
module.exports.getToken = getToken;
