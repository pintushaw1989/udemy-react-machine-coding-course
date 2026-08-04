import React, { useEffect, useState } from "react";
import Pagination from "./Pagination.jsx";

import "./ProductList.css";

const ProductList = ({ url, productPerPage }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate current page products
  const startIndex = productPerPage * (currentPage - 1);
  const endIndex = startIndex + productPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);
  const totalProduct = allProducts.length;

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
      {totalProduct > 0 && (
        <Pagination
          productCount={totalProduct}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productPerPage={productPerPage}
        />
      )}
    </div>
  );
};

export default ProductList;
