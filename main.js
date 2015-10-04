var Agent = require('socks5-http-client/lib/Agent');
var request = require('request');
var http = require('http');
var url = require('url');
var socksHost = '127.0.0.1';
var socksPort = 7070;

http.createServer(function (req, res) {
   var srvUrl = url.parse(req.url,true);
   var q = srvUrl.query.url
   var num = srvUrl.query.num || 10;

   parseFeed(q,num,function(err,feeds){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(feeds);
   })
}).listen(8000);

console.log('Server running on port 8000.');


function parseFeed (url,num,callback) {
      request({
            url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q='+url+"&num="+num,
            agentClass: Agent,
            agentOptions: {
                  socksHost: socksHost,
                  socksPort: socksPort
            }
      }, function(err, res) {
            callback(err,res.body);
      });
}