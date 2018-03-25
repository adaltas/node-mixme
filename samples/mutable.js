
var assert = require('assert');
var mixme = require('../lib');

obj = {a: '1'};
mixme.mutate(obj, {b: '2'})

assert.deepEqual(
  obj,
  {a: '1', b: '2'}
);
