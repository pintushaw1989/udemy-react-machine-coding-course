import { useState, useCallback } from "react";
import { checkboxData } from "../data/checkboxData";
import { getAllNodeIds } from "../utils/treeHelpers";
import {
  checkAllNodes,
  createCheckedMap,
  uncheckAllNodes,
  updateNodeState,
} from "../utils/stateManager";
import { TreeNode } from "./TreeNode";
import "./NestedCheckbox.css";

export const NestedCheckbox = ({
  data = checkboxData,
  initialChecked = false,
  showControls = true,
}) => {
  // State for checked items
  const [checkedMap, setCheckedMap] = useState(() =>
    createCheckedMap(data, initialChecked),
  );

  // State for expanded nodes
  const [expandedNodes, setExpandedNodes] = useState(() => {
    const allIds = getAllNodeIds(data);
    return new Set(allIds);
  });

  // Track if all nodes are expanded
  const [allExpanded, setAllExpanded] = useState(true);

  // Toggle handler
  const handleToggle = useCallback(
    (nodeId, isChecked) => {
      setCheckedMap((prev) => updateNodeState(data, prev, nodeId, isChecked));
    },
    [data],
  );

  // Expand/collapse handler
  const handleToggleExpand = useCallback((nodeId) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  // Toggle all nodes expand/collapse
  const handleToggleAllExpand = useCallback(() => {
    const allIds = getAllNodeIds(data);
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      const hasExpanded = allIds.some((id) => prev.has(id));

      if (hasExpanded) {
        // If any node is expanded, collapse all
        allIds.forEach((id) => newSet.delete(id));
        setAllExpanded(false);
      } else {
        // If all nodes are collapsed, expand all
        allIds.forEach((id) => newSet.add(id));
        setAllExpanded(true);
      }
      return newSet;
    });
  }, [data]);

  // Bulk check/uncheck operations
  const handleCheckAll = useCallback(() => {
    setCheckedMap((prev) => checkAllNodes(data, prev));
  }, [data]);

  const handleUncheckAll = useCallback(() => {
    setCheckedMap((prev) => uncheckAllNodes(data, prev));
  }, [data]);

  return (
    <div className="nested-checkbox">
      {/* Header */}
      <div className="nested-checkbox-header">
        <h2 className="nested-checkbox-title">
          <span className="icon">📋</span>
          Nested Checkbox
          <span className="nested-checkbox-badge">
            {data.length} categories
          </span>
        </h2>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="nested-checkbox-controls">
          <button
            className="control-btn control-btn-primary"
            onClick={handleCheckAll}
          >
            ✅ Check All
          </button>
          <button
            className="control-btn control-btn-danger"
            onClick={handleUncheckAll}
          >
            ❌ Uncheck All
          </button>
          <button
            className="control-btn control-btn-info"
            onClick={handleToggleAllExpand}
          >
            {allExpanded ? "📂 Collapse All" : "📂 Expand All"}
          </button>
        </div>
      )}

      {/* Tree */}
      <div className="nested-checkbox-tree">
        {data.map((rootNode) => (
          <TreeNode
            key={rootNode.id}
            node={rootNode}
            depth={0}
            checkedMap={checkedMap}
            onToggle={handleToggle}
            expandedNodes={expandedNodes}
            onToggleExpand={handleToggleExpand}
          />
        ))}
      </div>
    </div>
  );
};

export default NestedCheckbox;
