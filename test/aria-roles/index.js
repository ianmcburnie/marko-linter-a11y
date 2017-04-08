const tap = require('tap');
const audit = require('../../audit/aria-roles');
const astQuery = require('../../lib/AstQuery.js');
const filename = './template.marko';
const treeAndContext = require('../../lib/TreeAndContext.js').create(filename);
const flattenedTree = astQuery.flattenTree(astQuery.removeDocumentType(treeAndContext.tree));

const allHtmlElements = astQuery.getAllHtmlElements(flattenedTree);
const allHtmlElementsWithAttributes = astQuery.patchAttributePos(astQuery.getAllHtmlElementsWithAttributes(allHtmlElements));
const allHtmlAttributeCollections = astQuery.getAllHtmlAttributeCollections(allHtmlElementsWithAttributes);
const allHtmlAttributes = astQuery.getAllHtmlAttributes(allHtmlAttributeCollections);

var results = audit.run(allHtmlAttributes);

//console.log(results);

tap.equal(results.length, 1, 'Should find invalid carousel role');