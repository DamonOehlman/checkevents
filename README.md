
# checkevents

This is a simple test helper that is designed to work in conjunction with
[tape](https://github.com/substack/tape).  It's designed to make testing
server-sent event streams a little simpler and tests can be run in both
a server environment (e.g. [travis](https://travis-ci.org)) and browser
(e.g. [testling](https://ci.testling.com)).

[
![Build Status]
(https://travis-ci.org/DamonOehlman/checkevents.png?branch=master)
](https://travis-ci.org/DamonOehlman/checkevents)

[
![browser support]
(https://ci.testling.com/DamonOehlman/checkevents.png)
](https://ci.testling.com/DamonOehlman/checkevents)


[![NPM](https://nodei.co/npm/checkevents.png)](https://nodei.co/npm/checkevents/)

[![Build Status](https://api.travis-ci.org/DamonOehlman/checkevents.svg?branch=master)](https://travis-ci.org/DamonOehlman/checkevents) [![bitHound Score](https://www.bithound.io/github/DamonOehlman/checkevents/badges/score.svg)](https://www.bithound.io/github/DamonOehlman/checkevents) 

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

## License(s)

### MIT

Copyright (c) 2016 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
