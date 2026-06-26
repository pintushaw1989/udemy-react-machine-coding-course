import { useEffect, useRef, useState } from "react";

// Add expiration (60 seconds)
const CACHE_TTL = 60000;

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
      const { data, timestamp } = cacheRef.current[query];
      if (Date.now() - timestamp < CACHE_TTL) {
        setData(data);
        setLoading(false);
        return;
      }
      // Expired - continue to fetch
      delete cacheRef.current[query];
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

        cacheRef.current[query] = {
          data: products,
          timestamp: Date.now(),
        };
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
