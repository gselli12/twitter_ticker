const express = require("express");
const app = express();

const {filter} = require("./filter.js");

const {getToken, getTweets} = require("./requests.js");

//const {promises} = require("./promises.js");

app.use(express.static(__dirname + "/Public/ticker"));

//const handles = ["DieTagespresse"];

//defining GET request to "/headlines.json"
//getToken gets getTweets as a callback. getTweets gets filter as a callback
app.get("/headlines.json", (req,res) => {
    getToken((err, token) => {
        if (err) {
            console.log(err); res.json({
                success: false
            });
        }
        else{
            getTweets(token, "DieTagespresse" , (err, data) => {
                if (err) {
                    console.log(err);
                    res.json( {
                        success: false
                    });
                } else {
                    res.json(filter(data));
                }
            });
        }
    });
});

app.listen(8080, () => {
    console.log("listening on port 8080");
});
