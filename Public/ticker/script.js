var headlines = $('#headlines');
var count = headlines[0].offsetLeft;
var toAppend = $('.line').eq(0);
var rafid;


$.ajax({
    url: "headlines.json",
    success: function(data) {
        //console.log(data[0].text);
        try {
            JSON.parse(data);
        }
        catch (e) {
            return;
        }
        finally {
            for (var i = 0; i < data.length; i++) {
                $("a").eq(i).attr("href", data[i].url);
                $("a").eq(i).html(data[i].text);
            }
        }
    }
});



function moveHeadlines() {
    count --;
    if (toAppend[0].offsetWidth + headlines[0].offsetLeft <= 0) {
        headlines.append(toAppend.eq(0));
        count += toAppend[0].offsetWidth;
        toAppend = $('.line');
    }
    headlines.css("left",count +"px");
    rafid = requestAnimationFrame(moveHeadlines);
}
headlines.on("mouseenter", function() {
    cancelAnimationFrame(rafid);
});
headlines.on("mouseleave", function() {
    requestAnimationFrame(moveHeadlines);
});
moveHeadlines();
