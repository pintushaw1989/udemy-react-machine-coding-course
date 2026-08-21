import React, { useState, useEffect } from "react";

import "./InfiniteScroll.css";

const InfiniteScroll = ({ url, productPerPage }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${url}?skip=${productPerPage * (currentPage - 1)}&limit=${productPerPage}`,
        );
        const data = await response.json();

        if (data?.products?.length > 0) {
          setProducts((prev) => [...prev, ...data.products]);
          setTotal(data.total);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, productPerPage, url]);

  useEffect(() => {
    const handleScroll = () => {
      // console.log("height:", document.documentElement.scrollHeight); // total scroll hight
      // console.log("Top:", document.documentElement.scrollTop); // scroll to react top
      // console.log("Window:", window.innerHeight); // current window height

      // top + window + 1 > height
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
        !loading &&
        products.length < total
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, products, total]);

  return (
    <>
      <div className="product-list">
        {products?.length > 0
          ? products.map((item) => (
              <div className="product-card" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))
          : !loading && <p>No products found</p>}
      </div>

      {loading && <div className="loading">Loading...</div>}

      {!loading && products?.length >= total && total > 0 && (
        <p className="end-message">No more products to show</p>
      )}
    </>
  );
};

export default InfiniteScroll;
