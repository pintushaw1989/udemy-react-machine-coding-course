import {
  findNode,
  getAllNodeIds,
  getAncestors,
  getDirectChildrenIds,
} from "./treeHelpers";

// Create checked map from data
export const createCheckedMap = (nodes, initialChecked = false) => {
  const ids = getAllNodeIds(nodes);
  const map = new Map();
  ids.forEach((id) => map.set(id, initialChecked));
  return map;
};

// Update node state with propagation
export const updateNodeState = (nodes, checkedMap, nodeId, isChecked) => {
  const newMap = new Map(checkedMap);

  // STEP 1: Update the node itself
  newMap.set(nodeId, isChecked);

  // STEP 2: Update all descendants (downward propagation)
  const targetNode = findNode(nodes, nodeId);
  if (targetNode) {
    const updateDescendants = (node) => {
      if (node.children) {
        node.children.forEach((child) => {
          newMap.set(child.id, isChecked);
          updateDescendants(child);
        });
      }
    };
    updateDescendants(targetNode);
  }

  // STEP 3: Update all ancestors (upward propagation)
  const ancestors = getAncestors(nodes, nodeId);

  // Process from closest parent to root
  for (let i = ancestors.length - 1; i >= 0; i--) {
    const parentId = ancestors[i];
    const childIds = getDirectChildrenIds(nodes, parentId);

    if (childIds.length > 0) {
      // Check if ALL children are checked
      const allChecked = childIds.every(
        (childId) => newMap.get(childId) === true,
      );
      const anyChecked = childIds.some(
        (childId) => newMap.get(childId) === true,
      );

      // Set parent state
      if (allChecked) {
        newMap.set(parentId, true);
      } else if (!anyChecked) {
        newMap.set(parentId, false);
      } else {
        newMap.set(parentId, false); // Indeterminate visual will handle partial
      }
    }
  }

  return newMap;
};

// Bulk operations
export const checkAllNodes = (nodes, checkedMap) => {
  const ids = getAllNodeIds(nodes);
  const newMap = new Map(checkedMap);
  ids.forEach((id) => newMap.set(id, true));
  return newMap;
};

export const uncheckAllNodes = (nodes, checkedMap) => {
  const ids = getAllNodeIds(nodes);
  const newMap = new Map(checkedMap);
  ids.forEach((id) => newMap.set(id, false));
  return newMap;
};
