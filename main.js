var request = require('request');
var http = require('http');
var url = require('url');
var fs = require("fs");
var path = require('path');


var mime = {
   "css": "text/css",
   "gif": "image/gif",
   "html": "text/html",
   "ico": "image/x-icon",
   "jpeg": "image/jpeg",
   "jpg": "image/jpeg",
   "js": "text/javascript",
   "json": "application/json",
   "pdf": "application/pdf",
   "png": "image/png",
   "svg": "image/svg+xml",
   "swf": "application/x-shockwave-flash",
   "tiff": "image/tiff",
   "txt": "text/plain",
   "wav": "audio/x-wav",
   "wma": "audio/x-ms-wma",
   "wmv": "video/x-ms-wmv",
   "xml": "text/xml"
};

http.createServer(function(req, res) {
   var srvUrl = url.parse(req.url, true);
   if (srvUrl.pathname != '/feed') {
      var realPath = srvUrl.pathname == '/' ? 'index.html' : './' + srvUrl.pathname;

      fs.exists(realPath, function(exists) {
         if (!exists) {
            res.writeHead(404, {
               'Content-Type': 'text/plain'
            });

            res.write("This request URL " + srvUrl.pathname + " was not found on this server.");
            res.end();
         } else {
            console.log(realPath);
            fs.readFile(realPath, "binary", function(err, file) {
               if (err) {
                  res.writeHead(500, {
                     'Content-Type': 'text/plain'
                  });
                  res.end(err);
               } else {
                  var ext = path.extname(realPath);
                  ext = ext ? ext.slice(1) : 'unknown';
                  var contentType = mime[ext] || "text/plain";
                  res.writeHead(200, {
                     'Content-Type': contentType
                  });
                  res.write(file, "binary");
                  res.end();
               }
            });
         }
      });
   }

   var q = srvUrl.query.url
   var num = srvUrl.query.num || 10;

   /*  Use the randomNum and the time to invalidate the Google cache and 
        fetch the latest articles.
   */
   var randomNum = new Date().getTime() + Math.floor((Math.random() * 10000) + 1);
   q = encodeURIComponent(q);

   parseFeed(q, num, function(err, feeds) {
      jsonFeeds = JSON.parse(feeds)
      if (jsonFeeds.responseStatus != 200) {
         parseFeed(q, num, function(err, feeds) {
            res.writeHead(200, {
               'Content-Type': 'text/plain'
            });
            res.end(feeds);
         })
      } else {
         res.writeHead(200, {
            'Content-Type': 'text/plain'
         });
         res.end(feeds);
      }
   })
}).listen(5000);

console.log('Server running on port 9222.');


function parseFeed(q, num, callback) {
   apiUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + num + '&q=' + q;
   request({
      headers: {
         'Cache-Control': 'max-age=0'
      },
      timeout: 60000,
      url: apiUrl,
      strictSSL: true,
   }, function(err, res) {
      callback(err, res.body);
   });
}