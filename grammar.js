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
    source_file: $ => repeat($._definition),

    _definition: $ => choice(

    ),
   
    identifier: $ => /[\p{L}_][\p{L}\p{N}_]*/u,

    number: $ => /\d+/
  }
});
