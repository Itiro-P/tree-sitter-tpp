/**
 * @file Tree sitter for the Tpp language
 * @author Pedro Itiro Nagao <itiropedro@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "tpp",

  rules: {
    source_file: $ => repeat($.definition_list),

    definition_list: $ => choice(
      seq(
        prec.left($.definition_list),
        $.definition
      ),
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
      seq(
        prec.left($.variable_list),
        $.COMMA,
        $.variable
      ),
      $.variable
    ),

    variable: $ => choice(
      $.identifier,
      seq($.identifier, $.index)
    ),

    index: $ => choice(
      seq(
        prec.left($.index),
        $.OPEN_BRACKET,
        $.expression,
        $.CLOSE_BRACKET
      ),
      seq(
        $.OPEN_BRACKET,
        $.expression,
        $.CLOSE_BRACKET
      )
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
      $.parameter_list,
      $.CLOSE_PARENTHESIS,
      $.BODY,
      $.END
    ),

    parameter_list: $ => choice(
      seq(
        prec.left($.parameter_list),
        $.COMMA,
        $.parameter
      ),
      $.parameter,
      $.EMPTY
    ),

    parameter: $ => choice(
      seq(
        $.TYPE,
        $.DOUBLE_DOT,
        $.identifier
      ),
      seq(
        prec.left($.parameter),
        $.OPEN_BRACKET,
        $.CLOSE_BRACKET
      )
    ),

    body: $ => choice(
      seq(
        prec.left($.body),
        $.action
      ),
      $.EMPTY
    ),

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
        $.body,
        $.END
      ),
      seq(
        $.IF,
        $.expression,
        $.THEN,
        $.body,
        $.ELSE,
        $.body,
        $.END
      )
    ),

    repeatt: $ => seq(
      $.REPEAT,
      $.body,
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

    expression: $ => choice(
      $.expression_logic,
      $.assignment
    )
  }
});
