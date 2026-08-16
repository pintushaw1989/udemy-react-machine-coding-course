import React, { useEffect, useState } from "react";
import Pagination from "./Pagination.jsx";

import "./ProductList.css";

const ProductList = ({ url }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(10);
  const [inputPage, setInputPage] = useState("");

  // Calculate current page products
  const startIndex = productPerPage * (currentPage - 1);
  const endIndex = startIndex + productPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);
  const totalProduct = allProducts.length;
  const totalPages = Math.ceil(totalProduct / productPerPage);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.products && data.total > 0) {
          setAllProducts(data.products);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [url]);

  // Reset to page 1 when items per page changes
  useEffect(() => {
    setCurrentPage(1);
    setInputPage("");
  }, [productPerPage]);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="products">
      <h1>React Pagination App</h1>
      <div className="product-list">
        {currentProducts && currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.thumbnail} alt={product.title} />
              <p>{product.title}</p>
            </div>
          ))
        ) : (
          <p className="no-product-message">No products found</p>
        )}
      </div>

      <div className="showing-info">
        Showing {startIndex + 1} - {Math.min(endIndex, totalProduct)} of{" "}
        {totalProduct} items
      </div>

      {totalProduct > 0 && (
        <Pagination
          productCount={totalProduct}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productPerPage={productPerPage}
        />
      )}

      {totalProduct > 0 && (
        <div className="controls">
          <div className="go-to-page">
            <label htmlFor="goToPage">Go to page:</label>
            <input
              id="goToPage"
              type="text"
              min={1}
              max={totalPages}
              value={inputPage}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (!isNaN(value) && value >= 1 && value <= totalPages) {
                  setInputPage(value);
                } else {
                  setInputPage("");
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const value = Number(e.target.value);
                  if (value >= 1 && value <= totalPages) {
                    setCurrentPage(value);
                  } else {
                    setCurrentPage(1); // Reset to valid page
                  }
                  e.target.blur(); // Remove focus after Enter
                }
              }}
            />
            <label>of {totalPages}</label>
          </div>
          <div className="items-per-page">
            <label htmlFor="itemsPerPage">Items per page:</label>
            <select
              id="itemsPerPage"
              value={productPerPage}
              onChange={(e) => setProductPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
