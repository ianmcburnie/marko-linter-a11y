const fs = require('fs');

const Compiler = require('marko/compiler');
const Builder = require('marko/compiler/builder');
const HtmlJsParser = require('marko/compiler/htmljsparser'); 
const Parser = require('marko/compiler/parser');
const CompileContext = require('marko/compiler/compilecontext');
const parser = new Parser(new HtmlJsParser({ignorePlaceholders: true}), {raw: true});

exports.create = function(filename) {
  const templateSrc = fs.readFileSync(filename, {encoding: 'utf8'});
  const context = new CompileContext(templateSrc, filename, Builder.DEFAULT_BUILDER);
  const tree = parser.parse(templateSrc, context);

  return {
    context,
    tree
  }
};