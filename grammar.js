/**
 * @file Tree sitter for the Tpp language
 * @author Pedro Itiro Nagao <itiropedro@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "tpp",

  conflicts: $ => [
    [$.variable, $.function_call]
  ],

  rules: {
    source_file: $ => repeat($.definition_list),

    definition_list: $ => choice(
      prec.left(1, seq($.definition_list, $.definition)),
      $.definition
    ),

    definition: $ => choice(
      $.variable_definition,
      $.variable_initialization,
      $.function_definition
    ),

    variable_definition: $ => seq(
      $.TYPE,
      $.DOUBLE_DOT,
      $.variable_list
    ),

    variable_initialization: $ => $.assignment,

    variable_list: $ => choice(
      prec.left(1, seq($.variable_list, $.COMMA, $.variable)),
      $.variable
    ),

    variable: $ => choice(
      $.identifier,
      seq($.identifier, $.index)
    ),

    index: $ => choice(
      prec.left(1, seq($.index, $.OPEN_BRACKET, $.expression, $.CLOSE_BRACKET)),
      seq($.OPEN_BRACKET, $.expression, $.CLOSE_BRACKET)
    ),

    TYPE: $ => choice(
      $.INTEGER,
      $.FLOAT
    ),

    function_definition: $ => choice(
      seq(
        $.TYPE,
        $.header
      ),
      $.header
    ),

    header: $ => seq(
      $.identifier,
      $.OPEN_PARENTHESIS,
      optional($.parameter_list),
      $.CLOSE_PARENTHESIS,
      optional($.body),
      $.END
    ),

    parameter_list: $ => seq(
      $.parameter,
      repeat(seq($.COMMA, $.parameter))
    ),

    parameter: $ => seq(
      $.TYPE,
      $.DOUBLE_DOT,
      $.identifier,
      optional(seq($.OPEN_BRACKET, $.CLOSE_BRACKET))
    ),

    body: $ => repeat1($.action),

    action: $ => choice(
      $.expression,
      $.variable_definition,
      $.iff,
      $.repeatt,
      $.readd,
      $.writee,
      $.returnn,
      $.errorr
    ),

    iff: $ => choice(
      seq(
        $.IF,
        $.expression,
        $.THEN,
        optional($.body),
        $.END
      ),
      seq(
        $.IF,
        $.expression,
        $.THEN,
        optional($.body),
        $.ELSE,
        optional($.body),
        $.END
      )
    ),

    repeatt: $ => seq(
      $.REPEAT,
      optional($.body),
      $.UNTIL,
      $.expression
    ),

    assignment: $ => seq(
      $.variable,
      $.ASSIGNMENT,
      $.expression
    ),

    readd: $ => seq(
      $.READ,
      $.OPEN_PARENTHESIS,
      $.variable,
      $.CLOSE_PARENTHESIS
    ),

    writee: $ => seq(
      $.WRITE,
      $.OPEN_PARENTHESIS,
      $.expression,
      $.CLOSE_PARENTHESIS
    ),

    returnn: $ => seq(
      $.RETURN,
      $.OPEN_PARENTHESIS,
      $.expression,
      $.CLOSE_PARENTHESIS
    ),

    errorr: $ => seq(
      $.ERROR,
      $.OPEN_PARENTHESIS,
      $.expression,
      $.CLOSE_PARENTHESIS
    ),

    expression: $ => choice(
      $.logical_expression,
      $.assignment
    ),

    logical_expression: $ => choice(
      $.simple_expression,
      prec.left(1, seq($.logical_expression, $.logical_operator, $.simple_expression))
    ),

    simple_expression: $ => choice(
      $.addition_expression,
      prec.left(1, seq($.simple_expression, $.relational_operator, $.addition_expression))
    ),

    addition_expression: $ => choice(
      $.multiplication_expression,
      prec.left(1, seq($.addition_expression, $.sum_operator, $.multiplication_expression))
    ),

    multiplication_expression: $ => choice(
      $.unary_expression,
      prec.left(1, seq($.multiplication_expression, $.multiplication_operator, $.unary_expression))
    ),

    unary_expression: $ => choice(
      $.factor,
      seq($.sum_operator, $.factor),
      seq($.negation_operator, $.factor)
    ),

    relational_operator: $ => choice(
      $.LESS,
      $.GREATER,
      $.EQUALS,
      $.DIFFERENT,
      $.LESS_EQUAL,
      $.GREATER_EQUAL
    ),

    sum_operator: $ => choice(
      $.SUM,
      $.MINUS
    ),

    logical_operator: $ => choice(
      $.AND,
      $.OR
    ),

    negation_operator: $ => $.NOT,

    multiplication_operator: $ => choice(
      $.TIMES,
      $.DIVIDED
    ),

    factor: $ => choice(
      seq(
        $.OPEN_PARENTHESIS,
        $.expression,
        $.CLOSE_PARENTHESIS
      ),
      $.variable,
      $.function_call,
      $.number
    ),

    number: $ => choice(
      $.NUM_INTEGER,
      $.NUM_FLOAT,
      $.NUM_SCIENTIFIC_NOTATION
    ),

    function_call: $ => seq(
      $.identifier,
      $.OPEN_PARENTHESIS,
      optional($.argument_list),
      $.CLOSE_PARENTHESIS
    ),

    argument_list: $ => seq(
      $.expression,
      repeat(seq($.COMMA, $.expression))
    ),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    SUM: $ => '+',
    MINUS: $ => '-',
    TIMES: $ => '*',
    DIVIDED: $ => '/',
    DOUBLE_DOT: $ => ':',
    COMMA: $ => ',',
    LESS: $ => '<',
    GREATER: $ => '>',
    EQUALS: $ => '=',
    DIFFERENT: $ => "<>",
    LESS_EQUAL: $ => "<=",
    GREATER_EQUAL: $ => ">=",
    AND: $ => "&&",
    OR: $ => "||",
    NOT: $ => '!',
    OPEN_PARENTHESIS: $ => '(',
    CLOSE_PARENTHESIS: $ => ')',
    OPEN_BRACKET: $ => '[',
    CLOSE_BRACKET: $ => ']',
    IF: $ => "se",
    THEN: $ => "então",
    ELSE: $ => "senão",
    END: $ => "fim",
    REPEAT: $ => "repita",
    UNTIL: $ => "até",
    ASSIGNMENT: $ => ":=",
    READ: $ => "leia",
    WRITE: $ => "escreva",
    RETURN: $ => "retorna",
    ERROR: $ => "erro",
    INTEGER: $ => "inteiro",
    FLOAT: $ => "flutuante",
    NUM_INTEGER: $ => /\d+/,
    NUM_FLOAT: $ => /\d+\.?\d*/,
    NUM_SCIENTIFIC_NOTATION: $ => /\d+\.?\d*e(\+|-)?\d+/
  }
});
