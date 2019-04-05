
should = require 'should'
mixme = require '../src'

describe 'clone', ->

  it 'array', ->
    source = ['a', b: 'c', 10, ['d', e: 'f']]
    result = mixme.clone source
    result.should.eql source
    source[i] = null for element, i in source
    result.should.eql ['a', b: 'c', 10, ['d', e: 'f']]

  it 'object', ->
    source = a: 'b', c: 'd'
    result = mixme.clone source
    result.should.eql source
    source.a = null
    source.b = null
    result.should.eql a: 'b', c: 'd'
  
  it 'accept all types', ->
    mixme.clone(null)
    mixme.clone(true).should.eql true
    mixme.clone(1).should.eql 1
    mixme.clone('a').should.eql 'a'
