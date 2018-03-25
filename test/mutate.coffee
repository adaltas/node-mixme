
should = require 'should'
mixme = require '../src'

describe 'mutate', ->

  it 'enrich 1st object', ->
    obj1 = { a_key: 'a value', b_key: 'b value'}
    obj2 = { b_key: 'new b value'}
    result = mixme.mutate obj1, obj2
    result.should.eql obj1
    obj1.b_key.should.eql 'new b value'

  it 'overwrite arrays', ->
    obj1 = { a_key: 'a value', b_key: ['b value']}
    obj2 = { b_key: ['new b value']}
    mixme.mutate obj1, obj2
    obj1.b_key.should.eql ['new b value']
