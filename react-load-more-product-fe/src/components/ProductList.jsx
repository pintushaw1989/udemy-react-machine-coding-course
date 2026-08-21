import { useEffect, useState } from "react";
import "./ProductList.css";

const PRODUCT_PER_PAGE = 50;

const ProductList = ({ url }) => {
  const [allproducts, setAllproducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const totalProduct = allproducts.length;
  const totalPages = Math.ceil(totalProduct / PRODUCT_PER_PAGE);
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

  const currentProduct = allproducts.slice(0, currentPage * PRODUCT_PER_PAGE);

  return (
    <div className="container">
      <h1>React Pegination App</h1>
      <div className="product-list">
        {loading ? (
          <p>Loading....</p>
        ) : currentProduct && currentProduct.length > 0 ? (
          currentProduct.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <p>{product.title}</p>
            </div>
          ))
        ) : (
          <p className="no-product-message">No products found</p>
        )}
      </div>

      {!loading && hasMoreProducts && (
        <button
          className="load-more-button"
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Load More Products ({currentProduct.length}/{totalProduct})
        </button>
      )}

      {!loading && !hasMoreProducts && totalProduct > 0 && (
        <p className="end-message">No more products to show</p>
      )}
    </div>
  );
};

export default ProductList;
