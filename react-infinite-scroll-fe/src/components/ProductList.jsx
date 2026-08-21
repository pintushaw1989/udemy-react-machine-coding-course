import React, { useState, useEffect } from "react";

import "./ProductList.css";

const ProductList = ({ url, productPerPage }) => {
  const [allproducts, setAllproducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const totalProduct = allproducts.length;
  const totalPages = Math.ceil(totalProduct / productPerPage);
  const hasMoreProducts = currentPage < totalPages;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.products) {
          setAllproducts(data.products);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    const handleScroll = () => {
      // console.log("height:", document.documentElement.scrollHeight); // total scroll hight
      // console.log("Top:", document.documentElement.scrollTop); // scroll to react top
      // console.log("Window:", window.innerHeight); // current window height

      // top + window + 1 > height

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const innerHeight = window.innerHeight;
      if (
        innerHeight + scrollTop + 1 >= scrollHeight &&
        !loading &&
        currentPage < totalPages
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, loading, totalPages]);

  const currentProduct = allproducts.slice(0, currentPage * productPerPage);

  return (
    <div className="container">
      <h1>React Pagination App</h1>
      <div className="product-list">
        {currentProduct?.length > 0
          ? currentProduct.map((item) => (
              <div className="product-card" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))
          : !loading && <p>No products found</p>}
      </div>

      {loading && <div className="loading">Loading...</div>}

      {!loading && !hasMoreProducts && totalProduct > 0 && (
        <p className="end-message">No more products to show</p>
      )}
    </div>
  );
};

export default ProductList;
