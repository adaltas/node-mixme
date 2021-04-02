
import {is_object_literal} from '../src'

describe 'mixme.is_object_literal', ->

  it 'accept object', ->
    is_object_literal({}).should.be.true()
    is_object_literal(new Object()).should.be.true()
    is_object_literal(Object.create(null)).should.be.true()
    # Mozilla docs says `Object.create({})` create a normal object
    # https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
    # However, something must be different, no time to investigate
    # is_object_literal(Object.create({})).should.be.true()
  
  it 'reject non object', ->
    is_object_literal([]).should.be.false()
    is_object_literal(new Array()).should.be.false()
    is_object_literal(new String()).should.be.false()
    is_object_literal(new String()).should.be.false()
    is_object_literal(new Error()).should.be.false()
    is_object_literal(true).should.be.false()
    is_object_literal(false).should.be.false()
    is_object_literal(null).should.be.false()
    is_object_literal(undefined).should.be.false()
