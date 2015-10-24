var request = require('request');
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
   var srvUrl = url.parse(req.url,true);
   var q = srvUrl.query.url
   var num = srvUrl.query.num || 10;

   /*  Use the randomNum and the time to invalidate the Google cache and 
        fetch the latest articles.
   */
   var randomNum = new Date().getTime() + Math.floor((Math.random() * 10000) + 1);
   q = encodeURIComponent(q);

   parseFeed(q, num, function(err,feeds){
      jsonFeeds = JSON.parse(feeds)
      if (jsonFeeds.responseStatus != 200) {
         parseFeed(q, num, function(err,feeds){
                  res.writeHead(200, {'Content-Type': 'text/plain'});
                  res.end(feeds);
         })
      } else {
         res.writeHead(200, {'Content-Type': 'text/plain'});
         res.end(feeds);
      }
   })
}).listen(9222);

console.log('Server running on port 9222.');


function parseFeed (q,num,callback) {
      apiUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+ num+ '&q='+q;
      request({
            headers: {
               'Cache-Control': 'max-age=0'
            },
            timeout: 60000,
            url: apiUrl,
            strictSSL: true,
      }, function(err, res) {
         callback(err,res.body);
      });
}