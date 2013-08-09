/* jshint node: true */
'use strict';

var request = require('hyperquest');
var reAbsoluteUrl = /^\w{2,}\:\/\//;

/**
  # checkevents

  This is a simple test helper that is designed to work in conjunction with
  [tape](https://github.com/substack/tape).  It's designed to make testing
  server-sent event streams a little simpler and tests can be run in both
  a server environment (e.g. [travis](https://travis-ci.org)) and browser
  (e.g. [testling](https://ci.testling.com)).

  [
  ![browser support]
  (https://ci.testling.com/DamonOehlman/checkevents.png)
  ](https://ci.testling.com/DamonOehlman/checkevents)

  ## Installation

  ```
  npm install checkevents --save-dev
  ```

  ## Usage

  Here is a usage example from checkevents own test suite:

  ```js
  var test = require('tape');
  var checkEvents = require('checkevents');
  var isServer = typeof window == 'undefined';
  var testServer = isServer && require('./helpers/test-server');

  testServer && test('start server', function(t) {
    t.plan(1);
    testServer.start(function(err) {
      t.ifError(err, 'started');
    });
  });

  test('string values', checkEvents('/strings', ['a', 'b', 'c']));
  test('numeric values', checkEvents('/numbers', [1, 2, 3]));
  test('object values', checkEvents('/objects', [ { a: 1 }, { b: 2 }]));

  testServer && test('stop server', function(t) {
    t.plan(1);
    t.ok(testServer.stop(), 'stopped');
  });
  ```

**/

var checkEvents = module.exports = function(url, items) {

  var isAbsolute = reAbsoluteUrl.test(url);

  function client(t) {
    var expected = [].concat(items || []);
    var src;

    t.plan(1 + expected.length);

    src = new EventSource(url);

    src.addEventListener('open', function handleOpen(evt) {
      t.pass('opened');
      src.removeEventListener('open', handleOpen);
    });

    src.addEventListener('message', function handleMessage(evt) {
      var testVal = expected.shift();

      // if the test value is an object, stringify
      if (typeof testVal == 'object' && (! (testVal instanceof String))) {
        testVal = JSON.stringify(testVal);
      }

      t.equal(evt.data, '' + testVal, 'received: ' + testVal);
      if (expected.length === 0) {
        src.removeEventListener('data', handleMessage);
        src.close();
      }
    });
  }  

  function server(t) {
    var expected = [].concat(items || []);
    var testUrl = isAbsolute ? url : checkEvents.baseurl + url;
    var req;

    t.plan(2 + expected.length);

    req = request.get(testUrl);

    req.on('response', function(res) {
      t.equal(res.statusCode, 200, 'got 200 OK');

      res.on('end', t.pass.bind(t, 'ended'));
      res.on('data', function handleData(data) {
        var testVal = expected.shift();

        // if the test value is an object, stringify
        if (typeof testVal == 'object' && (! (testVal instanceof String))) {
          testVal = JSON.stringify(testVal);
        }

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

  return checkEvents.server ? server : client;
};

checkEvents.server = typeof window == 'undefined';
checkEvents.baseurl = 'http://localhost:3000';