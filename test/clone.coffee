
require 'should'
import {clone} from '../src'

describe 'clone', ->

  it 'array', ->
    source = ['a', b: 'c', 10, ['d', e: 'f']]
    result = clone source
    result.should.eql source
    source[i] = null for element, i in source
    result.should.eql ['a', b: 'c', 10, ['d', e: 'f']]

  it 'object', ->
    source = a: 'b', c: 'd'
    result = clone source
    result.should.eql source
    source.a = null
    source.b = null
    result.should.eql a: 'b', c: 'd'
  
  it 'accept all types', ->
    clone(null)
    clone(true).should.eql true
    clone(1).should.eql 1
    clone('a').should.eql 'a'
