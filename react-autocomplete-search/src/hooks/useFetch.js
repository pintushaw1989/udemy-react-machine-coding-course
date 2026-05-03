import { useEffect, useRef, useState } from "react";

export const useFetch = (query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // store current controller
  const controllerRef = useRef(null);

  // catch store
  const cacheRef = useRef({});

  useEffect(() => {
    // cancel previous request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // check cache FIRST
    if (cacheRef.current[query]) {
      setData(cacheRef.current[query]);
      return;
    }

    // create new controller
    const controller = new AbortController();
    controllerRef.current = controller;

    const fetchSearch = async () => {
      // safety check
      if (typeof query !== "string" || query.trim().length < 2) {
        setData([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
          { signal: controller.signal },
        );
        const results = await res.json();
        const products = results.products || [];

        // store in cache
        cacheRef.current[query] = products;
        setData(products);
      } catch (error) {
        if (error.name !== "AbortError") console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch(query);

    return () => {
      controller.abort();
    };
  }, [query]);

  return { data, loading };
};
