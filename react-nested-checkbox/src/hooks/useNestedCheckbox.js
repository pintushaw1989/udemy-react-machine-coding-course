import { useState, useCallback } from "react";
import {
  createCheckedMap,
  checkAllNodes,
  uncheckAllNodes,
} from "../utils/stateManager";
import { findNode } from "../utils/treeHelpers";

export const useNestedCheckbox = (nodes, initialChecked = false) => {
  const [checkedMap, setCheckedMap] = useState(() =>
    createCheckedMap(nodes, initialChecked),
  );

  const checkAll = useCallback(() => {
    setCheckedMap((prev) => checkAllNodes(nodes, prev));
  }, [nodes]);

  const uncheckAll = useCallback(() => {
    setCheckedMap((prev) => uncheckAllNodes(nodes, prev));
  }, [nodes]);

  const getNodeInfo = useCallback(
    (nodeId) => {
      const node = findNode(nodes, nodeId);
      if (!node) return null;

      const isChecked = checkedMap.get(nodeId) || false;
      const hasChildren = node.children && node.children.length > 0;

      let isIndeterminate = false;
      if (hasChildren) {
        const childIds = node.children.map((c) => c.id);
        const checkedChildren = childIds.filter(
          (id) => checkedMap.get(id) === true,
        );
        const uncheckedChildren = childIds.filter(
          (id) => checkedMap.get(id) === false,
        );
        isIndeterminate =
          checkedChildren.length > 0 && uncheckedChildren.length > 0;
      }

      return { isChecked, isIndeterminate, hasChildren };
    },
    [nodes, checkedMap],
  );

  const getCheckedNodes = useCallback(() => {
    const result = [];
    checkedMap.forEach((value, key) => {
      if (value) result.push(key);
    });
    return result;
  }, [checkedMap]);

  const reset = useCallback(() => {
    setCheckedMap(createCheckedMap(nodes, false));
  }, [nodes]);

  return {
    checkedMap,
    checkAll,
    uncheckAll,
    getNodeInfo,
    getCheckedNodes,
    reset,
  };
};
