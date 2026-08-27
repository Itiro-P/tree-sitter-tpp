(variable_definition
  (variable_list
    (variable
      (identifier) @local.definition.var)))

(function_definition
  (header
    (identifier) @local.definition.function))

(identifier) @local.reference

(parameter
  (identifier) @local.definition.parameter)

[
 (function_definition)
 (iff)
 (repeatt)
] @local.scope
