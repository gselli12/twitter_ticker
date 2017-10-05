//decalring function filter! Filters tweets that have != 1 url and cleans the urls out of the text
var filter = (data) => {
    let list = [];
    let text;
    for (let i = 0; i < data.length; i++) {
        if (data[i].entities.urls.length === 1) {
            text = data[i].text.replace(data[i].entities.urls[0].url, "");

            if (data[i].entities.media && data[i].entities.media.length > 0) {
                text = text.replace(data[i].entities.media[0].url, "");
            }
            list.push({
                "text" : text,
                "url" : data[i].entities.urls[0].url
            });
        }
    }
    return list;
};

module.exports.filter = filter;
