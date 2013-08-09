var request = require('hyperquest');
var reAbsoluteUrl = /^\w{2,}\:\/\//;

var checkEvents = module.exports = function(url, items) {

  function client(t) {
    var expected = [].concat(items || []);
    var src;

    t.plan(2 + expected.length);

    src = new EventSource(url);

    src.addEventListener('open', function handleOpen(evt) {
      t.pass('opened');
      src.removeEventListener('open', handleOpen);
    });

    src.addEventListener('message', function(evt) {
      
    });
  }  

  function server(t) {
    var expected = [].concat(items || []);
    var req;

    t.plan(2 + expected.length);

    req = request.get(baseUrl + url);

    req.on('response', function(res) {
      t.equal(res.statusCode, 200, 'got 200 OK');

      res.on('end', t.pass.bind(t, 'ended'));
      res.on('data', function handleData(data) {
        var testVal = expected.shift();

        t.equal(
          data.toString(),
          'data: ' + testVal + '\n\n',
          'received: ' + testVal
        );

        if (expected.length === 0) {
          res.removeListener('data', handleData);
          req.end();
        }
      });
    });
  }

  // check if the url is a base url
  if (! reAbsoluteUrl.test(url)) {
    url = runTests.baseurl + url;
  }

  return runTests.server ? ? server : client;
};

checkEvents.server = typeof window == 'undefined';
checkEvents.baseurl = 'http://localhost:3000';