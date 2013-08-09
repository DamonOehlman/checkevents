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
