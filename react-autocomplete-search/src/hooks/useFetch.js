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

    // Check cache
    if (query in cacheRef.current) {
      setData(cacheRef.current[query]);
      setLoading(false);
      return;
    }

    // Guard against invalid queries
    if (typeof query !== "string" || query.trim().length < 2) {
      setData([]);
      setLoading(false);
      return;
    }

    // create new controller
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);

    const fetchSearch = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const results = await res.json();
        const products = results.products || [];

        cacheRef.current[query] = products;
        setData(products);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
          setData([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchSearch();

    return () => {
      controller.abort();
      setLoading(false);
    };
  }, [query]);

  return { data, loading };
};
