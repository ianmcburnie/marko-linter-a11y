const filterText = item => item.type !== 'Text';

const filterDocumentType = item => item.type !== 'DocumentType';

const flattenArray = (a, b) => a.concat(b);

const getAllHtmlElements = nodeList => nodeList.filter(filterText); 

const getAllHtmlElementsWithAttributes = htmlElementList => htmlElementList.filter(item => item.attributes.length > 0);

const getAllHtmlAttributeCollections = htmlElementList => htmlElementList.map(item => item.attributes);

const getAllHtmlAttributes = htmlAttributeCollection => htmlAttributeCollection.map(item => item).reduce(flattenArray);

const getAllHtmlAttributesByName = (htmlAttributeList, name) => htmlAttributeList.filter(item => item.name === name);

function patchAttributePos(htmlElementList) {
  htmlElementList.forEach(function(node) {
    node.attributes.forEach(function(attribute) {
      attribute.pos = node.pos;
    });
  });

  return htmlElementList;
}

function removeDocumentType(node) {
  return node.body.array.filter(filterDocumentType);
}

function flattenTree(array, nodeList = []) {
  if (array.length === 0) {
    return nodeList;
  }

  nodeList.push(array);

  array.filter(filterText).forEach(node => flattenTree(node.body.array, nodeList));

  return nodeList.reduce((a, b) => a.concat(b));
}

module.exports = {
  filterText,
  filterDocumentType,
  flattenTree,
  getAllHtmlAttributeCollections,
  getAllHtmlElements,
  getAllHtmlElementsWithAttributes,
  getAllHtmlAttributes,
  getAllHtmlAttributesByName,
  patchAttributePos,
  removeDocumentType
}