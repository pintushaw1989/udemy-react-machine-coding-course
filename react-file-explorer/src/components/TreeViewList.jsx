import React from "react";
import TreeViewItem from "./TreeViewItem";

const TreeViewList = ({ list }) => {
  if (!list?.length) return null;
  // console.log(list);
  return (
    <ul className="menu-list">
      {list.map((item, index) => (
        <TreeViewItem key={item.id || `${item.label}-${index}`} item={item} />
      ))}
    </ul>
  );
};

export default TreeViewList;
