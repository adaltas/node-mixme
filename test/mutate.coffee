
should = require 'should'
import {mutate} from '../src'

describe 'mutate', ->
  
  describe 'mutation', ->

    it 'enrich 1st object', ->
      obj1 = { a: 'a value', b: 'b value', c: { d: 'd value', f: 'f value'}}
      obj2 = { b: 'b new', c: d: 'd new'}
      mutate obj1, obj2
      .should.eql { a: 'a value', b: 'b new', c: { d: 'd new', f: 'f value'}}

  describe '2nd arg not object', ->
    
    it 'object with string', ->
      obj1 = { a_key: 'a value', b_key: 'b value'}
      obj2 = 'b'
      result = mutate obj1, obj2
      result.should.eql 'b'
        
    it 'object with undefined', ->
      obj1 = a_key: 'a value', b_key: 'b value'
      obj2 = undefined
      mutate obj1, obj2
      .should.eql a_key: 'a value', b_key: 'b value'
        
    it 'object with null', ->
      obj1 = a_key: 'a value', b_key: 'b value'
      obj2 = null
      (mutate(obj1, obj2) is null)
      .should.be.true()
    
  describe '2nd arg object', ->

    it 'object with object', ->
      obj1 = { a_key: 'a value', b_key: 'b value'}
      obj2 = { b_key: 'new b value'}
      result = mutate obj1, obj2
      result.b_key.should.eql 'new b value'

    it 'object with null', ->
      obj1 = { a: { b: '1' } }
      obj2 = { a: { b: null } }
      result = mutate obj1, obj2
      result.should.eql { a: { b: null } }

    it 'object with undefined', ->
      obj1 = { a: { b: '1' } }
      obj2 = { a: { b: undefined } }
      result = mutate obj1, obj2
      result.should.eql { a: { b: '1' } }

    it 'avoid infinite loop', ->
      obj1 = { a_key: { b_key : 'b value' } }
      obj2 = obj1
      mutate obj1, obj2
      obj1.a_key.b_key.should.eql 'b value'

    it 'overwrite regexp value', ->
      obj1 = { a: /.*/mg, b: { c : /.*/ } }
      obj2 = { b: { c : /^.*$/ } }
      res = mutate obj1, obj2
      res.should.eql { a: /.*/mg, b: { c : /^.*$/ } }

    it 'buffer with buffer', ->
      obj1 = { a_key: Buffer.from 'abc' }
      obj2 = { a_key: Buffer.from 'def' }
      res = mutate obj1, obj2
      res.a_key.toString().should.eql 'def'

    it 'string with string', ->
      obj1 = { a_key: 'abc' }
      obj2 = { a_key: 'def' }
      res = mutate obj1, obj2
      res.a_key.should.eql 'def'

    it 'array with object', ->
      obj1 = ['a', 'b']
      obj2 = {a: '1', b: '2'}
      res = mutate obj1, obj2
      res.should.eql {a: '1', b: '2'}
