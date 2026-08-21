import React, { useEffect, useState } from "react";

import "./LoadMoreProducts.css";

const LoadMoreProducts = ({ url, productPerPage }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productCount, setProductCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil((productCount || 0) / productPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${url}?skip=${productPerPage * (currentPage - 1)}&limit=${productPerPage}`,
        );
        const data = await response.json();

        if (data && data.products && data.products.length > 0) {
          setProducts((prev) => [...prev, ...data.products]);
          setProductCount(data.total);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, productPerPage, url]);

  return (
    <div className="container">
      <h1>React Load More Products</h1>
      <div className="product-list">
        {products && products.length > 0
          ? products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <p>{product.title}</p>
              </div>
            ))
          : null}
      </div>

      {!loading && products.length >= (productCount || 0) && (
        <p className="end-message">No more products to show</p>
      )}

      {currentPage < totalPages && (
        <button
          className="load-more-button"
          disabled={loading}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          {loading ? "Loading..." : "Load More Products"}
        </button>
      )}
    </div>
  );
};

export default LoadMoreProducts;
