
should = require 'should'
import {merge} from '../src'

describe 'mixme.merge', ->

  it 'does not alter arguments', ->
    obj1 = a: 1, b: 2, c: 0
    obj2 = a: 1, c: 3, d: 4
    merge obj1, obj2
    .should.eql a: 1, b: 2, c: 3, d: 4
    obj1
    .should.eql a: 1, b: 2, c: 0
    obj2
    .should.eql a: 1, c: 3, d: 4
