; Schema for syntax highlighting

(header) @function

(identifier) @variable

(function_call
  (identifier) @function.call)

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

(END) @keyword

[
  (READ)
  (WRITE)
  (RETURN)
  (ERRORR)
] @function.builtin

(readd
  (READ) @function.call)

(writee
  (WRITE) @function.call)

(returnn
  (RETURN) @function.call)

(errorr
  (ERRORR) @function.call)

[
 (INTEGER)
 (FLOAT)
] @type.builtin

[
  (NUM_INTEGER)
  (NUM_SCIENTIFIC_NOTATION)
] @number

(NUM_FLOAT) @number.float
