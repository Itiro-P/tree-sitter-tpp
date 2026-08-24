(variable_definition
  (variable_list
    (variable
      (identifier) @local.definition.var)))

(function_definition
  (header
    (identifier) @local.definition.function))

(identifier) @local.reference

[
 (function_definition)
 (iff
   (THEN))
 (iff
   (ELSE))
 (repeatt
   (REPEAT)
] @local.scope
