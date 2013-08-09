var http = require('http');
var sse = require('pull-sse');
var pull = require('pull-stream');
var server = http.createServer();

exports.start = function(callback) {
  server.on('request', function(req, res) {
    var source;

    if (req.url === '/numbers') {
      source = pull.values([1, 2, 3]);
    }
    else if (req.url === '/strings') {
      source = pull.values(['a', 'b', 'c']);
    }
    else if (req.url === '/objects') {
      source = pull.values([{ a: 1 }, { b: 2 }]);
    }

    if (source) {
      pull(source, sse(res));
    }
  });

  server.listen(process.env.PORT || 3000, callback);
};

exports.stop = server.close.bind(server);