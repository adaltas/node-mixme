
should = require 'should'
mixme = require '../src'

describe 'mixme', -

  it 'create a new object if first arg is an empty object', ->
    obj1 = { a_key: 'a value', b_key: 'b value'}
    obj2 = { b_key: 'new b value'}
    result = mixme {}, obj1, obj2
    result.b_key.should.eql 'new b value'

  it 'create a new object if first arg is null', ->
    obj1 = { a_key: 'a value', b_key: 'b value'}
    obj2 = { b_key: 'new b value'}
    result = mixme null, obj1, obj2
    result.b_key.should.eql 'new b value'

  it 'avoid infinite loop', ->
    obj1 = { a_key: { b_key : 'b value' } }
    obj2 = obj1
    mixme true, obj1, obj2
    obj1.a_key.b_key.should.eql 'b value'

  it 'overwrite regexp value', ->
    obj1 = { reg_key: /.*/mg, a_key: { regkey_key : /.*/ } }
    obj2 = { a_key: { regkey_key : /^.*$/ } }
    res = mixme {}, obj1, obj2
    res.should.eql { reg_key: /.*/mg, a_key: { regkey_key : /^.*$/ } }

  it 'overwrite buffer value', ->
    obj1 = { a_key: Buffer.from 'abc' }
    obj2 = { a_key: Buffer.from 'def' }
    res = mixme {}, obj1, obj2
    res.a_key.toString().should.eql 'def'
