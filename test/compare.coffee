
require 'should'
import {compare} from '../src'

describe 'compare', ->

  it 'array', ->
    compare(['a'], ['a']).should.be.true()
    compare([['a']], [['a']]).should.be.true()
    compare('a', ['a']).should.be.false()
    compare(['a'], 'a').should.be.false()

  it 'object', ->
    # Object with object
    compare({a: 1}, {a: 1}).should.be.true()
    # Agnostic to key order
    compare({a: 1, b: 2}, {b: 2, a: 1}).should.be.true()
    # No casting
    compare({a: 1}, {a: '1'}).should.be.false()
    # Keys length differ
    compare({a: 1}, {b: 2, a: 1}).should.be.false()
    compare({a: 1, b: 2}, {a: 1}).should.be.false()

  it 'string', ->
    # Object with object
    compare('1', '1').should.be.true()
    # No casting
    compare('1', 1).should.be.false()

  it 'null & undefined', ->
    # Same values
    compare(undefined, undefined).should.be.true()
    compare(null, null).should.be.true()
    # Strict
    compare(undefined, null).should.be.false()
