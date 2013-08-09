var http = require('http');
var sse = require('pull-sse');
var pull = require('pull-stream');
var server = http.createServer();

exports.start = function(callback) {
  server.on('request', function(req, res) {
    if (req.url === '/values') {
      pull(
        pull.values([1, 2, 3]),
        sse(res)
      );
    }
  });

  server.listen(3000, callback);
};

exports.stop = server.close.bind(server);