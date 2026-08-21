import "./App.css";
import ProductList from "./components/ProductList";

const URL = "https://dummyjson.com/products?limit=0";
const PRODUCT_PER_PAGE = 10;

function App() {
  return <ProductList url={URL} productPerPage={PRODUCT_PER_PAGE} />;
}

export default App;
