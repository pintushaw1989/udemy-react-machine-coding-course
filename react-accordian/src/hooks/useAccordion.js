import { useState, useCallback, useEffect } from "react";

export const useAccordion = (defaultOpenIds = []) => {
  const [selectionType, setSelectionType] = useState("single");

  // Single source of truth - store all open IDs in an array
  const [openIds, setOpenIds] = useState(defaultOpenIds);

  // Sync defaultOpenIds when component mounts or selectionType changes
  useEffect(() => {
    if (selectionType === "single" && defaultOpenIds.length > 0) {
      // Single select: only keep the first default ID
      setOpenIds([defaultOpenIds[0]]);
    } else if (selectionType === "multi" && defaultOpenIds.length > 0) {
      // Multi select: keep all default IDs
      setOpenIds(defaultOpenIds);
    }
  }, [defaultOpenIds, selectionType]);

  const handleSelect = useCallback(
    (id) => {
      if (selectionType === "single") {
        // Toggle: if already open, then close; otherwise open this one
        setOpenIds(openIds[0] === id ? [] : [id]);
      } else {
        // Multi select: toggle the ID
        setOpenIds((prevIds) =>
          prevIds.includes(id)
            ? prevIds.filter((item) => item !== id)
            : [...prevIds, id],
        );
      }
    },
    [selectionType, openIds],
  );

  const onOptionChange = useCallback((e) => {
    const newSelectionType = e.target.value;
    setSelectionType(newSelectionType);

    // Reset all open states when switching modes
    setOpenIds([]);
  }, []);

  const isOpen = useCallback(
    (id) => {
      return openIds.includes(id);
    },
    [openIds],
  );

  const expandAll = useCallback(
    (allIds) => {
      if (selectionType === "multi") {
        setOpenIds(allIds);
      }
    },
    [selectionType],
  );

  const collapseAll = useCallback(() => {
    if (selectionType === "multi") {
      setOpenIds([]);
    }
  }, [selectionType]);

  return {
    selectionType,
    handleSelect,
    onOptionChange,
    isOpen,
    expandAll,
    collapseAll,
  };
};
