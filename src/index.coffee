

merge = ->
  mutate {}, arguments...

clone = (target) ->
  if Array.isArray target
    target.map (element) ->
      clone element
  else if target and typeof target is 'object'
    mutate {}, target
  else
    target

mutate = ->
  target = arguments[0]
  for i in [1 ... arguments.length]
    source = arguments[i]
    if is_object_literal(target) and is_object_literal(source)
      for name of source
        target[name] = mutate target[name], source[name]
    else unless source is undefined
      target = source
  target

snake_case = (source, convert=true) ->
  target = {}
  if is_object_literal source
    u = if typeof convert is 'number' and convert > 0 then convert - 1 else convert
    for name of source
      src = source[name]
      name = _snake_case(name) if convert
      target[name] = snake_case src, u
  else
    target = source
  target

_snake_case = (str) ->
  str.replace /([A-Z])/g, (_, match, index) ->
    '_' + match.toLowerCase()

is_object = (obj) ->
  obj and typeof obj is 'object' and not Array.isArray obj

is_object_literal = (obj) ->
  test = obj
  if typeof obj isnt 'object' or obj is null then false else
    while not false
      break if Object.getPrototypeOf(test = Object.getPrototypeOf(test)) is null
    return Object.getPrototypeOf(obj) is test;

export {clone, is_object, is_object_literal, merge, mutate, snake_case}
