

module.exports = merge = ->
  mutate {}, arguments...

module.exports.clone = clone = (target, source={}) ->
  if Array.isArray target
    target.map (element) ->
      module.exports.clone element, {...source, level: (source.level or 0) + 1}
  else if target and typeof target is 'object'
    module.exports.mutate {}, target
  else
    target

module.exports.mutate = mutate = ->
  target = arguments[0]
  for i in [1 ... arguments.length]
    source = arguments[i]
    if is_object_literal(target) and is_object_literal(source)
      for name of source
        target[name] = mutate target[name], source[name]
    else unless source is undefined
      target = source
  target

module.exports.underscore = (source, underscore=true) ->
  target = {}
  if is_object_literal source
    u = if typeof underscore is 'number' and underscore > 0 then underscore - 1 else underscore
    for name of source
      src = source[name]
      name = _underscore(name) if underscore
      target[name] = module.exports.underscore src, u
  else
    target = source
  target

_underscore = (str) ->
  str.replace /([A-Z])/g, (_, match, index) ->
    '_' + match.toLowerCase()

module.exports.is_object = is_object = (obj) ->
  obj and typeof obj is 'object' and not Array.isArray obj

module.exports.is_object_literal = is_object_literal = (obj) ->
  test = obj
  if typeof obj isnt 'object' or obj is null then false else
    while not false
      break if Object.getPrototypeOf(test = Object.getPrototypeOf(test)) is null
    return Object.getPrototypeOf(obj) is test;
