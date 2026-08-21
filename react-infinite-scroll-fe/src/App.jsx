import ProductList from "./components/ProductList";
import "./App.css";

const URL = "https://dummyjson.com/products?limit=0";
const PRODUCT_PER_PAGE = 20;

function App() {
  return (
    <div className="infinite-scroll">
      <ProductList url={URL} productPerPage={PRODUCT_PER_PAGE} />
    </div>
  );
}

export default App;
