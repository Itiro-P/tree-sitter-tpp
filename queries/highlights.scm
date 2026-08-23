; Schema for syntax highlighting

(function_definition
  (TYPE) @keyword.function)

(header
  (identifier) @function)

(variable
  (identifier) @variable)

(parameter
  (identifier) @variable.parameter)

[
 (relational_operator)
 (sum_operator)
 (logical_operator)
 (negation_operator)
 (multiplication_operator)
 (ASSIGNMENT)
] @operator

[
  (DOUBLE_DOT)
  (COMMA)
] @punctuation.delimiter

[
 (OPEN_PARENTHESIS)
 (CLOSE_PARENTHESIS)
 (OPEN_BRACKET)
 (CLOSE_BRACKET)
] @punctuation.bracket

(comment) @comment

[
  (IF)
  (THEN)
  (ELSE)
] @keyword.conditional

[
  (REPEAT)
  (UNTIL)
] @keyword.repeat

(END) @label

[
  (READ)
  (WRITE)
  (ERRORR)
  (RETURN)
] @function.builtin

(readd
  (READ) @function.call)

(writee
  (WRITE) @function.call)

(returnn
  (RETURN) @function.call)

[
 (INTEGER)
 (FLOAT)
] @type.builtin

[
  (NUM_INTEGER)
  (NUM_SCIENTIFIC_NOTATION)
] @number

(NUM_FLOAT) @number.float
