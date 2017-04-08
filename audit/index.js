const astQuery = require('../lib/AstQuery.js');

const AriaRoles = require('./aria-roles');
//const AccessKeys = require('./accesskeys');

exports.run = function (flattenedAst) {
  const allHtmlElements = astQuery.getAllHtmlElements(flattenedAst);
  const allHtmlElementsWithAttributes = astQuery.patchAttributePos(astQuery.getAllHtmlElementsWithAttributes(allHtmlElements));
  const allHtmlAttributeCollections = astQuery.getAllHtmlAttributeCollections(allHtmlElementsWithAttributes);
  const allHtmlAttributes = astQuery.getAllHtmlAttributes(allHtmlAttributeCollections);
  const results = [];

  console.log(`Total HTMLElements: ${allHtmlElements.length}`);
  console.log(`Total HTMLAttributeCollections: ${allHtmlAttributeCollections.length}`);
  console.log(`Total HTMLAttributes: ${allHtmlAttributes.length}`);

  results.push(AriaRoles.run(allHtmlAttributes));
  //results.push(AccessKeys.run(allHtmlAttributes));

  return results.reduce((a,b) => a.concat(b));
}