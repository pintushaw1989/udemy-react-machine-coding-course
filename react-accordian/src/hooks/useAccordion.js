import { useState } from "react";

export const useAccordion = () => {
  const [selectionType, setSelectionType] = useState("single");
  const [selectedId, setSelectedId] = useState(null);
  const [multiSelectedId, setMultiSelectedId] = useState([]);

  const handleSelect = (id) => {
    if (selectionType === "single") {
      setMultiSelectedId([]);
      setSelectedId((prevId) => (prevId === id ? null : id));
    } else {
      setSelectedId(null);

      setMultiSelectedId((prevIds) =>
        prevIds.includes(id)
          ? prevIds.filter((item) => item !== id)
          : [...prevIds, id],
      );
    }
  };

  const onOptionChange = (e) => {
    // Reset both the selection
    setSelectedId(null);
    setMultiSelectedId([]);

    //Set the selected value
    setSelectionType(e.target.value);
  };

  const isOpen = (id) =>
    selectionType === "single"
      ? selectedId === id
      : multiSelectedId.includes(id);

  return {
    selectionType,
    handleSelect,
    onOptionChange,
    isOpen,
  };
};
