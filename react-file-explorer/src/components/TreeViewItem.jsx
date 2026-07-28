import React, { useState } from "react";
import TreeViewList from "./TreeViewList";

const TreeViewItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = item?.children?.length > 0;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li>
      <div className="menu-item">
        <p>{item.label}</p>

        {hasChildren && (
          <button
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-controls={`menu-${item.label}`}
          >
            {isOpen ? "−" : "+"}
          </button>
        )}
      </div>

      {hasChildren && isOpen && <TreeViewList list={item.children} />}
    </li>
  );
};

export default TreeViewItem;
