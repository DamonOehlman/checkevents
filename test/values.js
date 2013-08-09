var test = require('tape');
var checkEvents = require('..');
var testServer = require('./helpers/test-server')();
var isBrowser = typeof window != 'undefined';

isBrowser || test('start server', function(t) {
  t.plan(1);
  testServer.start(function(err) {
    t.ifError(err, 'started');
  });
});

test('check events', )

isBrowser || test('stop server', function(t) {
  t.plan(1);
  t.ok(testServer.stop(), 'stopped');
});