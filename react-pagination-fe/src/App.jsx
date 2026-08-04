import ProductList from "./components/ProductList.jsx";
import "./App.css";

const URL = "https://dummyjson.com/products?limit=0";

function App() {
  return <ProductList url={URL} />;
}

export default App;
