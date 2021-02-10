
import {snake_case} from  '../src'

describe 'snake_case', ->

  it 'boolean true', ->
    obj = aA: '1', bB: {dD: eE: '5'}, cC: '3'
    snake_case obj, true
    .should.eql a_a: '1', b_b: { d_d: e_e: '5'}, c_c: '3'

  it 'boolean 1', ->
    obj = aA: '1', bB: {dD: eE: '5'}, cC: '3'
    snake_case obj, 1
    .should.eql a_a: '1', b_b: { dD: eE: '5'}, c_c: '3'

  it 'boolean 2', ->
    obj = aA: '1', bB: {dD: eE: '5'}, cC: '3'
    snake_case obj, 2
    .should.eql a_a: '1', b_b: { d_d: eE: '5' }, c_c: '3'
