import { useEffect, useState } from "react";

export const useDebounce = (query, delay = 300) => {
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, query]);

  return debounce;
};
