import React from "react";
import MenuItem from "./MenuItem";

const MenuList = ({ list }) => {
  if (!list?.length) return null;
  // console.log(list);
  return (
    <ul className="menu-list">
      {list.map((item, index) => (
        <MenuItem key={item.id || `${item.label}-${index}`} item={item} />
      ))}
    </ul>
  );
};

export default MenuList;
