var test = require('tape');
var checkEvents = require('..');
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