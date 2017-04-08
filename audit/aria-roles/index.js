const Roles = require('./Roles.js');
const RuleName = 'aria-roles';

const validateNode = node => Roles.includes(node.value.value);

exports.run = function(attributeNodes) { 
  const roleAttributeNodes = attributeNodes.filter(node => node.name === 'role');
  const failedNodes = roleAttributeNodes.filter(node => !validateNode(node));

  return failedNodes.map(node => data = {
    name: RuleName,
    pos: node.pos,
    value: `Error: "${node.value.value}" is not a valid ARIA role`
  });
};
