
var assert = require('assert');
var mixme = require('../lib');

assert.deepEqual(
  mixme({a: '1'}, {b: '2'}),
  {a: '1', b: '2'}
);
