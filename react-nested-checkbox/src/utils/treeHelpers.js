// Get all node IDs from multiple roots
export const getAllNodeIds = (nodes, result = []) => {
  if (!Array.isArray(nodes)) {
    nodes = [nodes];
  }
  nodes.forEach((node) => {
    result.push(node.id);
    if (node.children && node.children.length > 0) {
      getAllNodeIds(node.children, result);
    }
  });
  return result;
};

// Find a node by ID across multiple roots
export const findNode = (nodes, id) => {
  if (!Array.isArray(nodes)) {
    nodes = [nodes];
  }
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

// Get direct children of a node
export const getDirectChildrenIds = (nodes, nodeId) => {
  const node = findNode(nodes, nodeId);
  return node?.children?.map((child) => child.id) || [];
};

// Get all ancestors of a node
export const getAncestors = (nodes, nodeId) => {
  if (!Array.isArray(nodes)) {
    nodes = [nodes];
  }
  const result = [];
  const findAncestors = (nodeList, targetId, path = []) => {
    for (const node of nodeList) {
      if (node.id === targetId) {
        result.push(...path);
        return true;
      }
      if (node.children) {
        if (findAncestors(node.children, targetId, [...path, node.id])) {
          return true;
        }
      }
    }
    return false;
  };
  findAncestors(nodes, nodeId);
  return result;
};