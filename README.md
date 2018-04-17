
# Node.js mixme

[![Build Status](https://secure.travis-ci.org/adaltas/node-mixme.png)](http://travis-ci.org/adaltas/node-mixme)

Merge multiple object recursively. The last object takes precedence over the 
previous ones. Only objects are merged. Arrays are overwritten.

## API

The API is minimalist, pass as many arguments as you wish, they will all be
merged.

The default function exported is immutable. Simply pass an empty object 
and get the return result to achieve immutability.

```javascript
mixme({a: '1'}, {b: '2'});
// return {a: '1', b: '2'}
```

If you wish to enrich an object, pass it as first argument to the `mutate` 
function:

```javascript
obj = {a: '1'};
mixme.mutate(obj, {b: '2'});
// obj is now {a: '1', b: '2'}
```

## Exemple

Merge an existing object with a second one:

```
obj1 = { a_key: 'a value', b_key: 'b value'};
obj2 = { b_key: 'new b value'};
result = misc.merge obj1, obj2
assert.eql result, obj1
assert.eql obj1.b_key, 'new b value'
```

Create a new object from two objects:

```
obj1 = { a_key: 'a value', b_key: 'b value'}
obj2 = { b_key: 'new b value'}
result = misc.merge {}, obj1, obj2
assert.eql result.b_key, 'new b value'
```

## Testing

Clone the repo, install the development dependencies and run the tests:

```bash
git clone http://github.com/wdavidw/node-mixme.git .
npm install
make test
```

## Contributors

*   David Worms: <https://github.com/wdavidw>

This package is developed by [Adaltas](http://www.adaltas.com).
