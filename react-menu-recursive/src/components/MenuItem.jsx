import React, { useState } from "react";
import MenuList from "./MenuList";

const MenuItem = ({ item }) => {
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
            onClick={() => handleToggle(item.label)}
            aria-expanded={isOpen}
            aria-controls={`menu-${item.label}`}
          >
            {isOpen ? "-" : "+"}
          </button>
        )}
      </div>

      {hasChildren && isOpen && <MenuList list={item.children} />}
    </li>
  );
};

export default MenuItem;
