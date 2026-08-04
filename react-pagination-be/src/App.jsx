import ProductList from "./components/ProductList.jsx";
import "./App.css";

const URL = "https://dummyjson.com/products";
const PRODUCT_PER_PAGE = 12;

function App() {
  return <ProductList url={URL} productPerPage={PRODUCT_PER_PAGE} />;
}

export default App;
