import React, { useEffect, useState } from "react";
import Pagination from "./Pagination.jsx";

import "./ProductList.css";

const ProductList = ({ url, productPerPage }) => {
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${url}?skip=${productPerPage * (currentPage - 1)}&limit=${productPerPage}`,
        );
        const data = await response.json();

        if (data && data.products && data.total > 0) {
          setProducts(data.products);
          setTotalProduct(data.total);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [currentPage, url, productPerPage]);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="pagination-app">
      <h1>React Pagination App</h1>
      <div className="product-list">
        {products && products.length > 0 ? (
          products.map((product) => (
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
