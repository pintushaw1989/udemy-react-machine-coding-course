import { Checkbox } from "./Checkbox";
import "./TreeNode.css";

export const TreeNode = ({
  node,
  depth = 0,
  checkedMap,
  onToggle,
  expandedNodes,
  onToggleExpand,
}) => {
  const { id, label, children = [] } = node;
  const hasChildren = children.length > 0;

  const isChecked = checkedMap.get(id) || false;

  let isIndeterminate = false;
  if (hasChildren) {
    const childIds = children.map((c) => c.id);
    const checkedChildren = childIds.filter(
      (cid) => checkedMap.get(cid) === true,
    );
    const uncheckedChildren = childIds.filter(
      (cid) => checkedMap.get(cid) === false,
    );
    isIndeterminate =
      checkedChildren.length > 0 && uncheckedChildren.length > 0;
  }

  const isExpanded = expandedNodes.has(id);

  const handleToggle = (nodeId, checked) => {
    onToggle(nodeId, checked);
  };

  const handleExpandToggle = (e) => {
    e.stopPropagation();
    onToggleExpand(id);
  };

  return (
    <div className="tree-node">
      <div className="tree-node-content">
        {hasChildren && (
          <button
            className={`tree-node-toggle ${isExpanded ? "expanded" : "collapsed"}`}
            onClick={handleExpandToggle}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            ▼
          </button>
        )}
        {!hasChildren && <span className="tree-node-spacer" />}

        <Checkbox
          id={id}
          label={label}
          checked={isChecked}
          indeterminate={isIndeterminate}
          onChange={handleToggle}
          depth={depth}
        />

        {hasChildren && (
          <span className="tree-node-count">
            ({children.filter((c) => checkedMap.get(c.id)).length}/
            {children.length})
          </span>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="tree-node-children">
          {children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              checkedMap={checkedMap}
              onToggle={onToggle}
              expandedNodes={expandedNodes}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
