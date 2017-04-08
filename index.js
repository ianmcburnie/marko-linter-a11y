const filename = './template.marko';
const astQuery = require('./lib/AstQuery.js');
const treeAndContext = require('./lib/TreeAndContext.js').create(filename);
const flattenedTree = astQuery.flattenTree(astQuery.removeDocumentType(treeAndContext.tree));

console.log(`Total Nodes: ${flattenedTree.length}`);

//console.log(JSON.stringify(astNode, null, 2));
//console.log(flattenedTree);
//console.log(flattenedTree.map(node => data = {type: node.type, tagName: node.tagName, pos: compileContext.getPosInfo(node.pos)}));

const results = require('./audit').run(flattenedTree);
const hasError = results.length > 0;

if (hasError) {
  results.forEach(result => result.pos = treeAndContext.context.getPosInfo(result.pos));
  console.log(results);
} else {
  console.log('No errors found');
}
